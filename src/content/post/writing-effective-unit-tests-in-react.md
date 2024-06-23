---
title: "Writing effective unit tests in React"
publishDate: "29 January 2023"
description: "How to write effective unit tests in React, and what to avoid"
tags: ["react", "testing"]
draft: true
---

Working accross multiple teams using ReactJS, I've often seen both bad, and great unit tests.
This post is a collection of my thoughts around what not to do, and what makes a unit test effective

## Bad Unit tests

### Don't test the language

_findProductsApi.ts_

```typescript
// Custom fetch wrapper that appends the base url to the request and resolveds the response as json
import { customFetch as fetch } from "@utils/customFetch";

export function findProducts({
	keyword,
	pageSize,
	page,
}: {
	keyword: string;
	pageSize: number;
	page: number;
}) {
	return fetch(`/api/products?keyword=${keyword}&pageSize=${pageSize}&page=${page}`);
}
```

_findProductsApi.test.ts_

```typescript
describe("findProducts", () => {
	it("should throw an error when fetch throws", async () => {
		fetch.mockRejectedValueOnce(new Error("error"));
		await expect(findProducts({ keyword: "test", pageSize: 10, page: 1 })).rejects.toThrow("error");
	});
});
```

In Javascript, exceptions that are thrown in a function are bubbled up the call stack, so we know that if the fetch function throws an error, the findProducts function will also throw the error. This test is not adding any value.

If there was exception handling logic that either returned a default value, or threw a custom error, then this kind of test might be useful.

### Don't focus on testing API calls

You may be inclined to write a test for `findProductsApi.ts` that looks like the following:

```typescript
  it('should call fetch with the correct url', async () => {
    await findProducts({ keyword: 'test', pageSize: 10, page: 1 })
    expect(fetch).toHaveBeenCalledWith('/api/products?keyword=test&pageSize=10&page=1')
  }
```

This test provides very little confidence that the API call is working as expected. If the API endpoint is not correct, the test will still pass.
Futhermore, this test will fail under almost no circumstances. For this test to fail, the impelmentation of `findProducts` would need to change.
However, this is extrodinarily unlikely without a developer intentionally making that change.

To have confindence that the contract between the frontend and the backend is enforced, you should have other means, such as e2e tests, that cover happy paths for components that rely on those API calls.
Between e2e tests, manual testing, PR reviews, and walkthroughs, you should have enough confidence that your API calls are hitting the correct endpoints.

### Don't test 3rd party libraries

The following code uses the `react-query` library for data fetching, and tests that the library works as expected.

_useFindProducts.ts_

```typescript
export function useFindProducts({
	keyword,
	pageSize,
	page,
}: {
	keyword: string;
	pageSize: number;
	page: number;
}) {
	return useQuery(["products", keyword, pageSize, page], () =>
		findProducts({ keyword, pageSize, page }),
	);
}
```

_useFindProducts.test.ts_

```typescript
import { findProducts } from '../api/findProductsApi'

jest.mock('../api/findProductsApi')

findProducts.mockResolvedValue([{ id: 1, name: 'Product Name', inStock: true }])

describe('useFindProducts`, () => {
    it('should return the products', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFindProducts({ keyword: 'test', pageSize: 10, page: 1 }))
        await waitForNextUpdate()
        expect(result.current.data).toEqual([{ id: 1, name: 'Product Name', inStock: true }])
    }
})
```

If the library is well tested, and has a strong type safety story, then you can trust that the library works as expected.

I wouldn't suggest you never test 3rd party libraries, but you should test them in the context of your application (continue reading for examples).

You should use libraries that:

1. Have a high level of test coverage
2. Have a strong type safety story

If you're relying on 3rd party libraries that don't adhere to the requirements above, consider either replacing the library, or submitting a PR to the library to improve it.

### Don't test CSS

This one I don't see as commonly, and there's not a lot of native ways to do it. As such, I won't go into detail here with a test example.

However, consider the following component:

_ProductCard.tsx_

```typescript
function ProductCard({ product }: { name: string, inStock: boolean }) {
    const { name, inStock } = product
    return (
        <div>
            <h1>{name}</h1>
            <div className={clsx({isStock ? 'bg-green-400' : 'bg-red-400'})}>
                {inStock ? 'In Stock' : 'Out of Stock'}
            </div>
        </div>
    )
}
```

The code `clsx({isStock ? 'bg-green-400' : 'bg-red-400'})` conditionally renders the background colour of the div based on the `inStock` property of the product by outputting a string that will then be applied as a class to the component.

Although there are methods to test the class property of the component, the classes applied to the DOM node, or perform regression testing through visual diffing, I would argue that all these methods are generally not worth the effort.

When developing changes that alter the UI, I prefer to lean on manual testing and walkthroughs to ensure that the UI looks, and behaves as expected.

If you are considering using a tool like Percy or Chromatic to test your UI, I would strongly consider the tradeoffs of the time spent reviewing those tests, and whether they are worth the effort.

## Writing effective unit tests

Working day to day on a complex point of sale system containing over 1500 unit tests, there's multiple times that i've been saved from accidentally introducing bugs into production.
As much as unit tests serve as a safety net, poorly written unit tests can also be a hindrance to development.

As such, I use the following guidelines to write effective unit tests to ensure that our team can move quickly, and with confidence.

### Test the component how the user would use it, rather than testing implementation details

Write good component tests that interact with the user like the user would. Don't test implementation details like the state of a component, or the props passed to a child component.

### Test the business logic

The best tests to write are tests around pure functions. Pure functions are functions that take in some input, and return some output, without any side effects.

In React Components, you might have some complicated state logic. Often times, this can be extracted into a `useReducer` hook, with the reducer function being a pure function.

### Lean on your type system for wiring

### Don't mock things at arbitrary levels

Tests should test business functionality, or how things are wired. They shouldn’t need to do both

.
