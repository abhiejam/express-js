### Get the request parameter

API: `http://localhost:9000/api/posts/6`
```
app.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
})

```

### `.js` extension requirements
- With "type":"module" in package.json (ES Modules), you must include .js extension
- `.js` extension is optional in Commonjs
- Also, bundlers like webpack and vite resolves them so don't need `.js` extension

### Named vs default export in JS
- In default export, you can export as one variable but import as another.
- Import and export shouldn't match


- In named export, import and export name must match