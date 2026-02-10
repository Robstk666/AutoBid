import json
import re

with open('lottie-data.js', 'r') as f:
    content = f.read()

with open('new_risk_data.json', 'r') as f:
    new_risk_json = f.read().strip()

# Find the start of riskData
start_marker = 'const riskData = '
start_index = content.find(start_marker)

if start_index == -1:
    print("Could not find riskData in lottie-data.js")
    exit(1)

# The new content should replace everything after start_marker until the end of the file or until a semicolon if present (though here it seems to be the last one)
# Let's assume it replaces until the end or next variable declaration.
# But looking at previous file read, it ends with marker list.

# We will just replace from start_index + len(start_marker) to the end of the file, assuming riskData is the last variable.
# Or better, we construct the file again.

# Let's see if there is anything after riskData.
# In the previous read_file, it ended with markers array.

# We will replace from start_index to the end.
new_content = content[:start_index] + start_marker + new_risk_json + ';'

with open('lottie-data.js', 'w') as f:
    f.write(new_content)

print("Successfully updated lottie-data.js")
