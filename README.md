# CustomDrop

Custom Dropdown filter is jquery plugin that allows you to add a filterable dropdown within your html.

# Basic Usage
html
```sh
<div id="form1" class="ctrl-container"></div>
```
javascript
```sh
$("#form1").CustomDrop({
                ctrlList: [{ value: 1, text: "Minor" }, 
                            { value: 2, text: "Moderate" }, 
                            { value: 3, text: "High" },
                            { value: 4, text: "Major" }, 
                            { value: 5, text: "Extreme" }],
                ctrlId: "StatusId"
            });
```


# Configurable Options

    ctrlId: (string),
    ctrlSelected: (int),
    ctrlLabelText: (string),
    ctrlIcon: {
                delIcon: (string)- glyphicon-remove,
                togIconup: (string)- glyphicon-chevron-up,
                togIcondown: (string)- glyphicon-chevron-down
                }
         

### Version
1.0.0

### Dependecies

CustomDrop uses a the following libraries:

* [jQuery] 
* [bootstrap] 


### Demo

open plugin1.html

