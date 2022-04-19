# `retool-tripetto-builder`: Tripetto's form builder hosted in a Retool custom component

## Usage

You can use this package in a retool's custom component and it will render tripetto's form builder with the live preview.

[Usage!]](https://imgur.com/a/fLjQn93)

## Quickstart
1. Add a custom component to your retool application
2. Update the component's iFrame Code
    In the component inspector, replace the default IFrame Code with the following:

    ```html
    <script type="text/javascript" src="https://unpkg.com/retool-tripetto-builder@latest/dist/index.js" />
    ```
3. Update the component's Model
    In the component inspector, replace the Model value with the following:

    ```typescript
    {
      "formDefinition": <formDefinition> // <-- input (can be populated by retool query)
    "formDefinitionOutput": {} // <-- output (can be references in retool app as `customComponentName.model.formDefinitionOutput)
    }
    ```

## Local Development
TBD
## Notes
Tripetto builder inspired by [Tripetto SDK / Builder / React / Live preview with autoscroll runner](https://codesandbox.io/s/tripetto-sdk-builder-react-live-preview-with-multiple-runners-forked-5x13mw?file=/src/builder.js:963-1071)

Package inspired by [tryretool/custom-component-guide](https://github.com/tryretool/custom-component-guide)
