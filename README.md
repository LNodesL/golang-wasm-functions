# Go WebAssembly Proof of Concept

A simple proof of concept demonstrating Go code compiled to WebAssembly and running in a web browser.

## Features

This POC demonstrates four Go functions compiled to WebAssembly:

1. **Addition** - Adds two numbers
2. **Greeting** - Returns a personalized greeting message
3. **Fibonacci** - Calculates the nth Fibonacci number
4. **Reverse String** - Reverses a string

## Requirements

- Go 1.11 or later (with WebAssembly support)
- A modern web browser with WebAssembly support
- Python 3 (for the simple HTTP server, or use any HTTP server)

## Setup

1. **Copy the WebAssembly JavaScript support file:**
   ```bash
   # For newer Go versions (1.20+)
   cp $(go env GOROOT)/lib/wasm/wasm_exec.js .
   # Or for older versions
   cp $(go env GOROOT)/misc/wasm/wasm_exec.js .
   ```

2. **Build the WebAssembly file:**
   ```bash
   GOOS=js GOARCH=wasm go build -o main.wasm main.go
   ```

   Or use the Makefile:
   ```bash
   make setup
   ```

## Running

Start a local HTTP server. You can't just open the HTML file directly due to CORS restrictions.

### Option 1: Using Python (recommended)
```bash
python3 -m http.server 8080
```

Or with Make:
```bash
make serve
```

### Option 2: Using Go's built-in server
```bash
go run -exec="$(go env GOROOT)/bin/go" -o /dev/null -exec="python3 -m http.server 8080"
```

### Option 3: Using any other HTTP server
- Node.js: `npx serve .`
- PHP: `php -S localhost:8080`
- Or any other static file server

Then open your browser and navigate to:
```
http://localhost:8080
```

## How It Works

1. **Go Code** (`main.go`): Defines functions that can be called from JavaScript
2. **WebAssembly Build**: Go compiles to `main.wasm` using `GOOS=wasm GOARCH=wasm`
3. **JavaScript Bridge** (`app.js`): Loads the WASM module and provides a bridge to call Go functions
4. **HTML** (`index.html`): Provides a UI to interact with the WASM functions

## File Structure

```
.
├── main.go          # Go source code with WASM functions
├── index.html       # Web interface
├── app.js          # JavaScript to load and use WASM
├── wasm_exec.js    # Go's WASM runtime (from Go installation)
├── main.wasm       # Compiled WebAssembly binary (generated)
├── Makefile        # Build automation
└── README.md       # This file
```

## Making Changes

After modifying `main.go`, rebuild:
```bash
make build
# or
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

Then refresh your browser (the server doesn't need to be restarted).

## Notes

- The Go WASM runtime requires `wasm_exec.js` which is included with Go
- WebAssembly files must be served over HTTP (not `file://` protocol)
- Modern browsers have excellent WebAssembly support
- The Go program uses `select {}` to keep the WASM module alive

## Troubleshooting

- **"main.wasm not found"**: Run `make build` or `make setup`
- **"wasm_exec.js not found"**: Run `make copy-wasm-exec` or copy it manually
- **CORS errors**: Make sure you're using an HTTP server, not opening the file directly
- **Functions not available**: Check the browser console for errors

## License

This is a proof of concept demonstration project.

