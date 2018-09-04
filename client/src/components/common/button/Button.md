## Basic button:

```jsx
<Button>Push Me</Button>
```

## Primary button

```jsx
<Button buttonColor="primary">Push Me</Button>
```
## Button as link
You can pass `<Link>` from **react-router-dom** package

```jsx
<Button
  buttonColor="primary"
  as={props => <a href="/">{props.children}</a>}
 >
  Push Me
</Button>
```
