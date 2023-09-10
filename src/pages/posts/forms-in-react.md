---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Forms in React'
draft: true
pubDate: 2023-08-20
description: ''
author: ''
image:
  url: ''
  alt: ''
tags: ['blogging']
---

# Forms in React

## Controlled form

This option is best when you might also be loading state into the form

```javascript
function LoginForm({onSubmit, buttonText}) {
    const [formState, setFormState] = useState({username: '', password: ''})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSubmit && onSubmit(formState)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState(formState => ({...formState, [e.target.name]: e.target.value}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    name="username"
                    type="text"
                    onChange={handleInputChange}
                    value={formState.username}
                />
            </div>
            <div>
                <input
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    value={formState.password}
                />
            </div>
            <button type="submit">{buttonText}</button>
        </form>
    )
```

We could also take advantage of currying for the `handleInputChange` function:

```javascript
function handleInputChange(field: string) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((formState) => ({ ...formState, [field]: e.target.value }))
  }
}

// JSX

;<input name="password" type="password" onChange={handleInputChange('password')} value={formState.password} />
```

## Uncontrolled Form

Basic option, suitable for something like a login form

```javascript
function LoginForm({ onSubmit, buttonText }) {
  function handleSubmit(e) {
    e.preventDefault()
    const { username, password } = e.target.elements
    const formState = {
      username: username.value,
      password: password.value,
    }
    onSubmit && onSubmit(formState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}
```

## Bonus Uncontrolled

Instead of using `event.target.elements`, you can also get the form data as an object by assigning `name` properties to the fields and using:

```javascript
const formState = Object.fromEntries(new FormData(e.target))
```

IMO: this option is the least extensible, and as such, I’d avoid it unless saving a few lines is absolutely critical.
