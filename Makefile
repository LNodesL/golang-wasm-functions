.PHONY: build serve clean

# Build the WebAssembly file
build:
	@echo "Building Go WebAssembly..."
	GOOS=js GOARCH=wasm go build -o main.wasm main.go
	@echo "Build complete! main.wasm created."
	@echo "Don't forget to copy wasm_exec.js from your Go installation."

# Copy wasm_exec.js from Go installation
copy-wasm-exec:
	@echo "Copying wasm_exec.js..."
	@if [ -f "$$(go env GOROOT)/lib/wasm/wasm_exec.js" ]; then \
		cp "$$(go env GOROOT)/lib/wasm/wasm_exec.js" .; \
	elif [ -f "$$(go env GOROOT)/misc/wasm/wasm_exec.js" ]; then \
		cp "$$(go env GOROOT)/misc/wasm/wasm_exec.js" .; \
	else \
		echo "Error: wasm_exec.js not found. Please download from https://github.com/golang/go/blob/master/misc/wasm/wasm_exec.js"; \
		exit 1; \
	fi
	@echo "wasm_exec.js copied successfully!"

# Setup everything (build + copy wasm_exec.js)
setup: copy-wasm-exec build
	@echo "Setup complete!"

# Serve the files (requires Python 3)
serve:
	@echo "Starting HTTP server on http://localhost:8080"
	@echo "Press Ctrl+C to stop"
	python3 -m http.server 8080

# Clean build artifacts
clean:
	rm -f main.wasm
	@echo "Cleaned build artifacts"

