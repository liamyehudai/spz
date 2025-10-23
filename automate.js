const fs = require('fs');

// Your keyMappings object
const keyMappings = {
    0: '1',
    1: '2',
    2: '3',
    3: '4',
    4: '5',
    5: '6',
    6: '7',
    7: '8',
    8: '9',
    9: '0',
    10: 'F1',
    11: 'F2',
    12: 'F3',
    13: 'F4',
    14: 'F5',
    15: 'F6',
    16: 'F7',
    17: 'F8',
    18: 'F9',
    19: 'F10',
    20: 'F11',
    21: 'Shift+F1',
    22: 'Shift+F2',
    23: 'Shift+F3',
    24: 'Shift+F4',
    25: 'Shift+F5',
    26: 'Shift+F6',
    27: 'Shift+F7',
    28: 'Shift+F8',
    29: 'Shift+F9',
    30: 'Shift+F10',
    31: 'Shift+F11',
};

// Function to map keys to thumbnail indices
function mapKeysToThumbnails(configJson, keyMappings) {
    Object.keys(configJson.state.A00NA43333OMIP.buttons)
    Object.keys(configJson.state.A00NA43333OMIP.buttons["0"]).forEach(index => {
        console.log("index: ", index);
        const button = configJson.state.A00NA43333OMIP.buttons["0"][index];
        const keys = button.states[0].keys;

        if (keyMappings[index]) {
            button.states[0].keys = keyMappings[index];
        } else {
            button.states[0].keys = null;
        }

        console.log(button);

    });
    return configJson;
}

// Function to read and process the JSON file
function processJsonFile() {
    // Read the JSON file
    fs.readFile('streamdeck_ui_export.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        try {
            // Parse the JSON data
            const configJson = JSON.parse(data);

            // Map the keys to thumbnail indices
            const updatedConfig = mapKeysToThumbnails(configJson, keyMappings);

            // Write the updated config back to a new file
            fs.writeFile('updated_streamdeck_ui_export.json', JSON.stringify(updatedConfig, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error("Error writing updated file:", err);
                } else {
                    console.log("File has been updated successfully.");
                }
            });
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });
}

// Run the process function
processJsonFile();
