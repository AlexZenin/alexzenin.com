---
title: "Forms in React"
publishDate: "2 October 2023"
description: "3 siple ways to get started with handling forms in React"
tags: ["react", "beginner", "intermediate", "typescript"]
draft: true
---

Forms are a fundamental part of any web application. In React, there are a few key different ways to handle forms.

In this post, we’ll look at main ways to get started, how to extend each option, and what tradeoffs exist.

## Uncontrolled Forms

We will start with the easiest way to get data from a form in React: using the `event` object that is passed to the `onSubmit` handler.

This is the least extensible option, and i wouldn't recommend it for antyhing other than the most basic forms. However, it will lay the foundation for the other options, so it's worth understanding.

Since the React docs has a great explainer of this method in the [`Input` element docs](https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form), I'll add it here for brevity:

> Add a `<form>` around your inputs with a `<button type="submit">` inside. It will call your `<form onSubmit>` event handler. By default, the browser will send the form data to the current URL and refresh the page. You can override that behavior by calling `e.preventDefault()`. Read the form data with `new FormData(e.target)`.

> Give a name to every `<input>`, for example `<input name="firstName" defaultValue="Taylor" />`. The name you specified will be used as a key in the form data, for example `{ firstName: "Taylor" }`.

Here is an example following the approach outlined above:

```javascript
function LoginForm({ onSubmit }) {
	function handleSubmit(e) {
		e.preventDefault();
		const formState = Object.fromEntries(new FormData(e.target));
		onSubmit(formState);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="username" type="text" />
			<input name="password" type="password" />
			<button type="submit">Submit</button>
		</form>
	);
}
```

While this is the most simple option, it’s also the least extensible.

For example, if you wanted to add a “remember me” checkbox, you wouldn't be able to automatically capture it through `new FormData()`.

Instead, we can use the [`elements` property of the form element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) through `e.target.elements` to get the form data.

```javascript
function LoginForm({ onSubmit }) {
	function handleSubmit(e) {
		e.preventDefault();
		const { username, password, rememberMe } = e.target.elements;
		const formState = {
			username: username.value,
			password: password.value,
			rememberMe: rememberMe.checked,
		};
		onSubmit(formState);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="username" type="text" />
			<input name="password" type="password" />
			<input name="rememberMe" type="checkbox" checked />
			<button type="submit">Submit</button>
		</form>
	);
}
```

Using this method, we can capture the checked value of the checkbox using `rememberMe.checked`, and this method will work regardless of whether you use the `name` or `id` attribute on the input.

While this allows us to capture the data at the time of submission, we often want to store the data in state, so that we can use it in other parts of the application.

This is also useful when we are loading the inital values for the form from an external source. This is often the case when building forms that allow users to edit existing data.

We can achieve this using [controlled components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).

## Controlled forms

"Controlled forms" is not an official term, but rather what i'm using to refer to forms where the state is stored in React state, and the input fields are controlled through the `value` and `onChange` props.

**This shifts the source of truth from the DOM -> React state.**

While more verbsose than the previous method, this gives us much greater control over the form state.

```javascript
function LoginForm({ onSubmit }: Props) {
    const [formState, setFormState] = useState({
        username: "",
        password: ""
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSubmit(formState)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState(formState => ({
            ...formState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="text"
                onChange={handleInputChange}
                value={formState.username}
            />
            <input
                name="password"
                type="password"
                onChange={handleInputChange}
                value={formState.password}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

By using `[e.target.name]: e.target.value`, we're still relying on the the implicit relationship between the `name` attribute and the form state. However we can remove this through taking advantage of currying for the `handleInputChange` function:

```javascript
// Curried handleInputChange function
function handleInputChange(fieldName: string) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((formState) => ({
        ...formState,
        [fieldName]: e.target.value
    }))
  }
}

// Input field with updated onChange handler
<input
    name="password-input-field"
    type="password"
    onChange={handleInputChange("password")}
    value={formState.password}
/>
```

This `onChange` handler is also equivalent to `onChange={(e) => handleInputChange("password")(e)}`.

While this curried function is great for input elements where you are trying to extract the `value` attribute, it doesn't work for all elements, or third-party components that expect handlers in the form `(value: string) => void`.

To accomodate those cases, lets refactor, and update our function to take the value directly:

```javascript
function handleInputChange(fieldName: string) {
  return (value: string | boolean) => {
    setFormState((formState) => ({
        ...formState,
        [fieldName]: value
    }))
  }
}
```

Now we have a flexible function we can use for both existing components and third-party components:

```javascript

// third-party component that takes an onChange handler in the form: (value: string) => void
<ThirdPartyComponent
    name="username"
    onChange={handleInputChange("username")}
    value={formState.username}
/>
<input
    name="password"
    type="password"
    onChange={(e) => handleInputChange("password")(e.target.value)}
    value={formState.password}
/>
<input
    name="rememberMe"
    type="checkbox"
    onChange={
        (e) => handleInputChange("rememberMe")(e.target.checked)
    }
    checked={formState.rememberMe}
/>
// ...
```

---

Finally, let's make the `handleInputChange` function fully type-safe by utilising generics, generic contraints, the `typeof` operator, and the `keyof` operator.

For completeness, here is a full example:

```javascript
function LoginForm({ onSubmit }: Props) {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        rememberMe: false
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSubmit(formState)
    }

    function handleInputChange<T extends keyof typeof formState>(
        fieldName: T
    ) {
        return (value: typeof formState[T]) => {
            setFormState((formState) => ({
                ...formState,
                [fieldName]: value
            }))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="text"
                onChange={(e) => {
                    handleInputChange("username")(e.target.value)
                }}
                value={formState.username}
            />
            <input
                name="password"
                type="password"
                onChange={(e) => {
                    handleInputChange("password")(e.target.value)
                }}
                value={formState.password}
            />
            <input
                name="rememberMe"
                type="checkbox"
                onChange={(e) => {
                    handleInputChange("rememberMe")(e.target.checked)
                }}
                checked={formState.rememberMe}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

---

The examples that we've covered in this article have been mostly focused around basic forms.

However when crafting a great user experience, we often want to add additional functionality, such as validation, and displaying error messages.

While it's certainly possible to do this with the methods we've covered so far, there are fantastic libraries that make this much easier.

At the time of writing, I would recommend [React Hook Form](https://react-hook-form.com/) if you're looking at adding additional functionality. Depending on when you're reading this, i would recommend reasearching what libraries are available, and what tradeoffs they have.

To guide you in your research, I would recommend looking for libraries that are fully type-safe and work well with [zod](https://zod.dev/) for validation. Zod itself is fully type-safe, and current most popular validation library available.

Wishing you all the best in your React journey!
