// Load and initialize the WebAssembly module
async function initWasm() {
    const go = new Go();
    
    try {
        const result = await WebAssembly.instantiateStreaming(
            fetch("main.wasm"),
            go.importObject
        );
        
        go.run(result.instance);
        
        // Hide loading, show demos
        document.getElementById("loading").style.display = "none";
        document.getElementById("demos").style.display = "block";
        
        console.log("WebAssembly module loaded successfully!");
    } catch (error) {
        console.error("Error loading WebAssembly:", error);
        document.getElementById("loading").innerHTML = 
            '<p class="error">Failed to load WebAssembly module. Make sure main.wasm exists and the server is running.</p>';
    }
}

// Demo functions
function demoAdd() {
    const a = parseFloat(document.getElementById("add1").value);
    const b = parseFloat(document.getElementById("add2").value);
    
    if (window.wasmAdd) {
        const result = window.wasmAdd(a, b);
        document.getElementById("addResult").textContent = result;
    } else {
        document.getElementById("addResult").textContent = "WASM not loaded";
    }
}

function demoGreet() {
    const name = document.getElementById("greetName").value || "World";
    
    if (window.wasmGreet) {
        const result = window.wasmGreet(name);
        document.getElementById("greetResult").textContent = result;
    } else {
        document.getElementById("greetResult").textContent = "WASM not loaded";
    }
}

function demoFibonacci() {
    const n = parseInt(document.getElementById("fibN").value);
    
    if (window.wasmFibonacci) {
        const result = window.wasmFibonacci(n);
        document.getElementById("fibResult").textContent = result;
    } else {
        document.getElementById("fibResult").textContent = "WASM not loaded";
    }
}

function demoReverse() {
    const input = document.getElementById("reverseInput").value;
    
    if (window.wasmReverseString) {
        const result = window.wasmReverseString(input);
        document.getElementById("reverseResult").textContent = result;
    } else {
        document.getElementById("reverseResult").textContent = "WASM not loaded";
    }
}

// Initialize WASM when page loads
initWasm();

