package main

import (
	"syscall/js"
)

// add adds two numbers
func add(this js.Value, args []js.Value) interface{} {
	if len(args) != 2 {
		return "Error: add requires exactly 2 arguments"
	}
	a := args[0].Float()
	b := args[1].Float()
	return a + b
}

// greet returns a greeting message
func greet(this js.Value, args []js.Value) interface{} {
	name := "World"
	if len(args) > 0 {
		name = args[0].String()
	}
	return "Hello, " + name + " from WebAssembly!"
}

// fibonacci calculates the nth Fibonacci number
func fibonacci(this js.Value, args []js.Value) interface{} {
	if len(args) != 1 {
		return "Error: fibonacci requires exactly 1 argument"
	}
	n := args[0].Int()

	if n < 0 {
		return "Error: n must be non-negative"
	}
	if n == 0 {
		return 0
	}
	if n == 1 {
		return 1
	}

	a, b := 0, 1
	for i := 2; i <= n; i++ {
		a, b = b, a+b
	}
	return b
}

// reverseString reverses a string
func reverseString(this js.Value, args []js.Value) interface{} {
	if len(args) != 1 {
		return "Error: reverseString requires exactly 1 argument"
	}
	str := args[0].String()
	runes := []rune(str)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func main() {
	// Register functions to the global scope
	js.Global().Set("wasmAdd", js.FuncOf(add))
	js.Global().Set("wasmGreet", js.FuncOf(greet))
	js.Global().Set("wasmFibonacci", js.FuncOf(fibonacci))
	js.Global().Set("wasmReverseString", js.FuncOf(reverseString))

	// Keep the program running
	select {}
}
