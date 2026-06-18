// Module for building the header and footer of each page. After which it attaches event listeners to handle the hidden upload URL dropdown.
export function buildHeaderFooter() {
    const logoURL = new URL('../img/header-logo.png', import.meta.url)

    document.getElementById('base-header').innerHTML = 
    `<a href="/" id="home-link">
        <img src="${logoURL.href}" alt="Website logo">
        <span>I Meme It</span>
    </a>
    <div class="upload-container">
        <button id="upload-button">
          Upload 
          <span id="down-arrow"></span>
        </button>
    
        <div id="upload-dropdown">
          <input type="text" id="upload-url-input" placeholder="Paste image URL here...">
          <button id="go-button">Go</button>
        </div>
    </div>`;
    
    document.getElementById('base-footer').innerHTML = 
    `&copy;2026 | I Meme It - Final Project | Spencer Rejas | WDD330 | <a href="https://www.flaticon.com/free-icons/text-to-image" title="text to image icons">Text to image icons created by Azland Studio - Flaticon</a>
    `;

    // Grab the needed elements to make the upload URL dropdown feature work.
    const uploadButton = document.getElementById('upload-button');
    const uploadDropdown = document.getElementById('upload-dropdown');
    const goButton = document.getElementById('go-button');
    const uploadUrlInput = document.getElementById('upload-url-input');

    // Event listeners to handle the visibility of the upload button dropdown input.
    uploadButton.addEventListener('click', (event) => {
      event.stopPropagation(); 
      uploadDropdown.classList.toggle('active');
      
      if (uploadDropdown.classList.contains('active')) {
        uploadUrlInput.focus(); 
      }
    });

    uploadDropdown.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    document.addEventListener('click', () => {
      uploadDropdown.classList.remove('active');
    });

    // Event listener to move to the edit page with the user provided image URL.
    goButton.addEventListener('click', () => {
      const imageUrl = uploadUrlInput.value.trim();
      if (imageUrl) {
        // Adjust the image path if needed
        let cleanUrl = imageUrl;
        if (cleanUrl.startsWith('//')) {
            cleanUrl = `https:${cleanUrl}`;
        }
        
        // Encode the URL and redirect to the edit page with it.
        const encodedUrl = encodeURIComponent(cleanUrl);
        location.href = `/edit?src=${encodedUrl}&name=Custom%20Upload`;
      }
    });
}

// Module for rendering lists of items to a specified DOM container using a template function. It accepts a list of items and a container element where the generated HTML will be inserted as arguments. It allows you to specify whether to clear the container before inserting new content and the position of the inserted HTML.
export function renderListWithTemplate(list, container, clear = false, templateFn = memeCardTemplate, position = 'afterbegin') {
    if (clear) {
        container.innerHTML = '';
    }
    const htmlStrings = list.map(templateFn);
    container.insertAdjacentHTML(position, htmlStrings.join(''));
}

// A template function for rendering a meme card. It takes a meme object, encodes it's URL and name, and returns an HTML string representing it's image and name, with the encoded information in the redirect address.
export function memeCardTemplate(meme) {
    // Encode the information for passing through a web address.
    const encodedUrl = encodeURIComponent(meme.url);
    const encodedName = encodeURIComponent(meme.name);

    return `
    <li class="meme-card">
        <a href="/edit?src=${encodedUrl}&name=${encodedName}">
            <img src="${meme.url}" alt="${meme.name}" referrerpolicy="no-referrer" loading="lazy">
        </a>
    </li>`;
}

// A function to build the editor controls for meme editing. It returns an HTML string representing the text editing div for 2 text boxes and a generation button.
export function buildEditorControls() {
    return `
    <div class="text-boxes">
        <div class="box-row">
            <div class="text-container">
                <textarea id="top-text" class="text" placeholder="Top Text"></textarea>
            </div>
            <div class="text-settings">
                <input type="color" id="top-text-color" value="#ffffff">
                <input type="color" id="top-border-color" value="#000000">
            </div>
        </div>

        <div class="box-row">
            <div class="text-container">
                <textarea id="bottom-text" class="text" placeholder="Bottom Text"></textarea>
            </div>
            <div class="text-settings">
                <input type="color" id="bottom-text-color" value="#ffffff">
                <input type="color" id="bottom-border-color" value="#000000">
            </div>
        </div>
        <button id="generate-button">Meme It</button>
    </div>
    `;
}

// A function to draw text on a meme template in a canvas and render it. It accepts the meme template you will be adding the text to, the canvas element from the DOM, the type of drawing, the top text input from the user, the top text color, the top text border color, the bottom text input from the user, the bottom text color, and the bottom text border color as arguments.
export function editMeme (memeTemplate, canvasElement, canvasContext, topTextInput, topTextFill, topTextBorder, bottomTextInput, bottomTextFill, bottomTextBorder) {
    // Canvas creation and format
    canvasContext.drawImage(memeTemplate, 0, 0, canvasElement.width, canvasElement.height);
    canvasContext.textAlign = 'center';
    canvasContext.font = 'bold 40px \'Calibri Light\', sans-serif';

    // Top text box format
    canvasContext.textBaseline = 'top';
    canvasContext.fillStyle = topTextFill.value;
    canvasContext.strokeStyle = topTextBorder.value;
    canvasContext.lineWidth = 6;

    canvasContext.strokeText(topTextInput.toUpperCase(), canvasElement.width / 2, 20);
    canvasContext.fillText(topTextInput.toUpperCase(), canvasElement.width / 2, 20);

    // Bottom text box format
    canvasContext.textBaseline = 'bottom';
    canvasContext.fillStyle = bottomTextFill.value;
    canvasContext.strokeStyle = bottomTextBorder.value;
    canvasContext.lineWidth = 6;

    canvasContext.strokeText(bottomTextInput.toUpperCase(), canvasElement.width / 2, canvasElement.height - 20);
    canvasContext.fillText(bottomTextInput.toUpperCase(), canvasElement.width / 2, canvasElement.height - 20);
}

// Function to build and display a success message, and provide a download button, once your meme has been created. It accepts the converted image blob, the file name of the template used, and the target DOM buttom element as arguments.
export function displayMemeSuccessMessage(imageBlob, baseFileName, generateButtonElement) {
    // Update the button text with the success message and transition to not looks like a button.
    generateButtonElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    generateButtonElement.innerText = 'Copied to Clipboard!';
    generateButtonElement.style.backgroundColor = '#ffffff';
    generateButtonElement.style.color = '#333333';

    // Create the download button.
    const downloadButton = document.createElement('button');
    downloadButton.id = 'download-button';
    downloadButton.innerText = 'Download Meme';

    // Event listener to download the image when clicked.
    downloadButton.addEventListener('click', () => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(imageBlob);
      downloadLink.download = `${baseFileName.replace(/\s+/g, '-').toLowerCase()}-meme.png`;
    
      // Remove the download button once it's done.
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });

    // Insert the download button into the DOM, right after the generate button.
    generateButtonElement.parentNode.insertBefore(downloadButton, generateButtonElement.nextSibling);
    return downloadButton;
}