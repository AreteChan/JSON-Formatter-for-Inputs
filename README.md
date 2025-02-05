# JSON Formatter for Inputs

## Description
This browser extension automatically formats JSON in input fields. It helps to ensure that JSON data entered into input fields is properly formatted and easy to read.

## Features
- Automatically formats JSON in `input` and `textarea` fields.
- Debounces input to avoid excessive processing.
- Only formats valid JSON, leaving other input unchanged.

## Installation
1. Clone or download this repository.
2. Open your browser and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.

## Usage
1. Open the `manifest.json` file.
2. Add the URL pattern of the page where you want to format JSON in the `matches` array under `content_scripts`. For example:
    ```json
    "matches": [
      "http://your-url-pattern/*", 
      "https://your-url-pattern-2/*"
    ]
    ```
3. Navigate to a page that matches the URL pattern you specified.
4. Enter JSON data into any `input` or `textarea` field.
5. The JSON will be automatically formatted after you stop typing for 300 milliseconds.

## Files
- `manifest.json`: Defines the extension's metadata and permissions.
- `content.js`: Contains the logic for detecting and formatting JSON input.

## License
This project is licensed under the MIT License.