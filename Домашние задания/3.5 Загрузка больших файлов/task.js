const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const progress = document.getElementById('progress');
const statusMessage = document.getElementById('status-message');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    statusMessage.textContent = 'Please select a file.';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true); // Replace with your endpoint

    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        progress.value = event.loaded / event.total;
        statusMessage.textContent = `Uploading... ${Math.floor(percentComplete)}%`;
      }
    };

    xhr.onload = function() {
      if (xhr.status === 200) {
        statusMessage.textContent = 'File uploaded successfully!';
        progress.value = 1; // Set to 100%
      } else {
        statusMessage.textContent = `Error: ${xhr.status} - ${xhr.statusText}`;
      }
    };

    xhr.onerror = function() {
        statusMessage.textContent = 'Upload failed.';
    };

    xhr.send(formData);
  } catch (error) {
    statusMessage.textContent = `An error occurred: ${error}`;
  }
});
