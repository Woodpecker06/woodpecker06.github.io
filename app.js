// Wait until the HTML layout is fully loaded into memory
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // TOOL 1: AES CIPHER LOGIC (Using CryptoJS)
  // ==========================================
  const aesKey = document.getElementById("aesKey");
  const aesInput = document.getElementById("aesInput");
  const aesOutput = document.getElementById("aesOutput");

  document.getElementById("btnAesEncrypt").addEventListener("click", () => {
    const text = aesInput.value.trim();
    const key = aesKey.value.trim();

    if (!text || !key) {
      alert("Please provide both a passphrase and input text.");
      return;
    }

    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    aesOutput.value = encrypted;
  });

  document.getElementById("btnAesDecrypt").addEventListener("click", () => {
    const ciphertext = aesInput.value.trim();
    const key = aesKey.value.trim();

    if (!ciphertext || !key) {
      alert("Please provide both a passphrase and cipher text.");
      return;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (!originalText) throw new Error("Incorrect Key");
      aesOutput.value = originalText;
    } catch (e) {
      alert("Decryption failed. Check your passphrase or cipher text!");
    }
  });


  // ==========================================
  // TOOL 2: CAESAR CIPHER LOGIC (Native JS)
  // ==========================================
  const caesarShift = document.getElementById("caesarShift");
  const caesarInput = document.getElementById("caesarInput");
  const caesarOutput = document.getElementById("caesarOutput");

  function runCaesar(text, shift) {
    return text.split('').map(char => {
      let code = char.charCodeAt(0);
      // Uppercase letters (A-Z)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
      }
      // Lowercase letters (a-z)
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
      }
      return char; // Non-alphabetic characters remain unchanged
    }).join('');
  }

  document.getElementById("btnCaesarEncode").addEventListener("click", () => {
    const shift = parseInt(caesarShift.value) || 0;
    caesarOutput.value = runCaesar(caesarInput.value, shift);
  });

  document.getElementById("btnCaesarDecode").addEventListener("click", () => {
    const shift = parseInt(caesarShift.value) || 0;
    caesarOutput.value = runCaesar(caesarInput.value, -shift);
  });


  // ==========================================
  // TOOL 3: BASE64 LOGIC (Using JS-Base64)
  // ==========================================
  const base64Input = document.getElementById("base64Input");
  const base64Output = document.getElementById("base64Output");

  document.getElementById("btnBase64Encode").addEventListener("click", () => {
    base64Output.value = Base64.encode(base64Input.value);
  });

  document.getElementById("btnBase64Decode").addEventListener("click", () => {
    try {
      base64Output.value = Base64.decode(base64Input.value);
    } catch (e) {
      alert("Invalid Base64 string!");
    }
  });

});