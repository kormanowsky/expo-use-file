# expo-use-file

## A collection of hooks to use for file syncing in expo apps. 

1. `useFile(fileName)` 
Returns three values: 
`[value, loadFromFile, writeToFile]`
Use `loadFromFile` to force load value from file. Use `writeToFile` to write new value to the file. 
2. `useJSONFile(fileName)`
It's the same as `useFile()` but handles JSON conversion by itself and returns object in `value`

# Version History 
- v1.0.0 - Initial Release 
- v1.1.0 - Fix bug when working with several files
- v1.1.1 - Bugfix
- v1.1.2 - Bugfix
- v1.1.3 - Bugfix