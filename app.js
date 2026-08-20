document.addEventListener('DOMContentLoaded', () => {

    const REQUIRED_KEY = "Mcdonalds";

    // --- TOOL 1: AES ENCRYPTION / DECRYPTION ---
    const aesKeyInput = document.getElementById('aesKey');
    const btnAesEncrypt = document.getElementById('btnAesEncrypt');
    const btnAesDecrypt = document.getElementById('btnAesDecrypt');
    const aesInput = document.getElementById('aesInput');
    const aesOutput = document.getElementById('aesOutput');

    // Encrypt Function
    if (btnAesEncrypt) {
        btnAesEncrypt.addEventListener('click', () => {
            const userEnteredKey = aesKeyInput.value;
            const textToEncrypt = aesInput.value;
            
            if (!textToEncrypt) return;

            // Fails if user doesn't enter "Mcdonalds"
            if (userEnteredKey !== REQUIRED_KEY) {
                aesOutput.value = "Error: Invalid key/passphrase.";
                return;
            }

            const encrypted = CryptoJS.AES.encrypt(textToEncrypt, userEnteredKey).toString();
            aesOutput.value = encrypted;
        });
    }

    // Decrypt Function
    if (btnAesDecrypt) {
        btnAesDecrypt.addEventListener('click', () => {
            const userEnteredKey = aesKeyInput.value;
            const textToDecrypt = aesInput.value;

            if (!textToDecrypt) return;

            // Fails if user doesn't enter "Mcdonalds"
            if (userEnteredKey !== REQUIRED_KEY) {
                aesOutput.value = "Error: Invalid key/passphrase.";
                return;
            }

            try {
                const decryptedBytes = CryptoJS.AES.decrypt(textToDecrypt, userEnteredKey);
                const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

                if (decryptedText) {
                    aesOutput.value = decryptedText;
                } else {
                    aesOutput.value = "Error: Invalid cipher text or incorrect key.";
                }
            } catch (error) {
                aesOutput.value = "Error: Failed to decrypt.";
            }
        });
    }

    // --- TOOL 2: CAESAR CIPHER ---
    const btnCaesarEncode = document.getElementById('btnCaesarEncode');
    const btnCaesarDecode = document.getElementById('btnCaesarDecode');
    const caesarInput = document.getElementById('caesarInput');
    const caesarShift = document.getElementById('caesarShift');
    const caesarOutput = document.getElementById('caesarOutput');

    function runCaesar(text, shift) {
        return text.replace(/[a-zA-Z]/g, (char) => {
            const start = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(((char.charCodeAt(0) - start + shift + 26) % 26) + start);
        });
    }

    if (btnCaesarEncode) {
        btnCaesarEncode.addEventListener('click', () => {
            const shift = parseInt(caesarShift.value, 10) || 0;
            caesarOutput.value = runCaesar(caesarInput.value, shift);
        });
    }

    if (btnCaesarDecode) {
        btnCaesarDecode.addEventListener('click', () => {
            const shift = parseInt(caesarShift.value, 10) || 0;
            caesarOutput.value = runCaesar(caesarInput.value, -shift);
        });
    }

    // --- TOOL 3: BASE64 ENCODER / DECODER ---
    const btnBase64Encode = document.getElementById('btnBase64Encode');
    const btnBase64Decode = document.getElementById('btnBase64Decode');
    const base64Input = document.getElementById('base64Input');
    const base64Output = document.getElementById('base64Output');

    if (btnBase64Encode) {
        btnBase64Encode.addEventListener('click', () => {
            base64Output.value = Base64.encode(base64Input.value);
        });
    }

    if (btnBase64Decode) {
        btnBase64Decode.addEventListener('click', () => {
            try {
                base64Output.value = Base64.decode(base64Input.value);
            } catch (e) {
                base64Output.value = "Error: Invalid Base64 string.";
            }
        });
    }
});