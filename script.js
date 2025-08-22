let currentCipher = 'caesar';

document.querySelectorAll('.cipher-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.cipher-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCipher = this.dataset.cipher;
        toggleCipherInputs();
    });
});

function toggleCipherInputs() {
    const caesarElements = [
        document.getElementById('caesarShift'),
        document.getElementById('caesar-label'),
        document.getElementById('caesar-info')
    ];
    
    const vigenereElements = [
        document.getElementById('vigenereKey'),
        document.getElementById('vigenere-label'),
        document.getElementById('vigenere-info')
    ];

    if (currentCipher === 'caesar') {
        caesarElements.forEach(el => el.classList.remove('hidden'));
        vigenereElements.forEach(el => el.classList.add('hidden'));
    } else {
        caesarElements.forEach(el => el.classList.add('hidden'));
        vigenereElements.forEach(el => el.classList.remove('hidden'));
    }
}

function caesarCipher(text, shift, decrypt = false) {
    if (decrypt) shift = -shift;
    
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toLowerCase().charCodeAt(0);
            let shifted = ((charCode - 97 + shift + 26) % 26) + 97;
            let shiftedChar = String.fromCharCode(shifted);
            return isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
        }
        return char;
    }).join('');
}

function vigenereCipher(text, key, decrypt = false) {
    if (!key) return text;
    
    key = key.toLowerCase().replace(/[^a-z]/g, '');
    if (!key) return text;

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toLowerCase().charCodeAt(0) - 97;
            const keyChar = key[keyIndex % key.length];
            const keyCode = keyChar.charCodeAt(0) - 97;
            
            let shifted;
            if (decrypt) {
                shifted = (charCode - keyCode + 26) % 26;
            } else {
                shifted = (charCode + keyCode) % 26;
            }
            
            let shiftedChar = String.fromCharCode(shifted + 97);
            result += isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
            keyIndex++;
        } else {
            result += char;
        }
    }
    
    return result;
}

function encrypt() {
    const text = document.getElementById('inputText').value;
    if (!text.trim()) {
        alert('Harap masukkan teks yang ingin dienkripsi!');
        return;
    }

    let result;
    
    if (currentCipher === 'caesar') {
        const shift = parseInt(document.getElementById('caesarShift').value);
        if (isNaN(shift) || shift < 1 || shift > 25) {
            alert('Harap masukkan nilai shift antara 1-25!');
            return;
        }
        result = caesarCipher(text, shift);
    } else {
        const key = document.getElementById('vigenereKey').value;
        if (!key.trim()) {
            alert('Harap masukkan kata kunci untuk Vigenere Cipher!');
            return;
        }
        result = vigenereCipher(text, key);
    }

    showResult(result);
}

function decrypt() {
    const text = document.getElementById('inputText').value;
    if (!text.trim()) {
        alert('Harap masukkan teks yang ingin didekripsi!');
        return;
    }

    let result;
    
    if (currentCipher === 'caesar') {
        const shift = parseInt(document.getElementById('caesarShift').value);
        if (isNaN(shift) || shift < 1 || shift > 25) {
            alert('Harap masukkan nilai shift antara 1-25!');
            return;
        }
        result = caesarCipher(text, shift, true);
    } else {
        const key = document.getElementById('vigenereKey').value;
        if (!key.trim()) {
            alert('Harap masukkan kata kunci untuk Vigenère Cipher!');
            return;
        }
        result = vigenereCipher(text, key, true);
    }

    showResult(result);
}

function showResult(result) {
    document.getElementById('resultText').textContent = result;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

toggleCipherInputs();
