/*Default object for markup
        containerClass: (string),
        controllerClass: (string),
        dropContainerClass: (string),
        iconClass: {
            container: (string),
            labelName: (string),
            delClassName: (string),
            togClassName: (string)
        },
        formClass: {
            labelName: (string),
            hidInputName: (string),
            searchName: (string)
*/
var defobj = {
    containerClass: "ctrl-container",
    controllerClass: "ctrl-controls",
    dropContainerClass: "ctrl-dropcontainer",
    iconClass: {
        container: "ctrl-icons",
        labelName: "ctrl-label",
        delClassName: "ctrl-controls-clear",
        togClassName: "ctrl-controls-toggle"
    },
    formClass: {
        labelName: "ctrl-label",
        hidInputName: "ctrl-hidden-input",
        searchName: "ctrl-search"
    }
};


function AssignValue(thiselem, thistext, thisvalue) {
    $("#" + thiselem).val(thisvalue).prev('.' + defobj.formClass.labelName).html(thistext);
}

(function ($) {
    $.fn.CustomDrop = function (options) {

       /* Configurable Options:
            ctrlList: (Object)[{value: int, tesxt: string}],
            ctrlId: (string)
            ctrlSelected: (int),
            ctrlLabelText: (string),
            ctrlIcon: {
                delIcon: (string)- glyphicon-remove,
                togIconup: (string)- glyphicon-chevron-up,
                togIcondown: (string)- glyphicon-chevron-down,
            }
        */
        var elemobj = $.extend({
            ctrlList: [],
            ctrlId: "",
            ctrlSelected: 0,
            ctrlLabelText: "[Please Select]",
            ctrlIcon: {
                delIcon: "glyphicon-remove",
                togIconup: "glyphicon-chevron-up",
                togIcondown: "glyphicon-chevron-down",
            }
        }, options);


        CreateControl(this);
        BindListOptions(this);
        BindSearchList(this);
        BindClearControl(this);
        BindToggleControl(this);
        return this;

        function CreateControl(elem) {
            $(elem).append("<div class=\"" + defobj.containerClass + "\"><div class=\"" + defobj.controllerClass + "\">"
                            + "<div class=\"" + defobj.iconClass.container + "\">"
                            + "<a><span class=\"glyphicon " + elemobj.ctrlIcon.delIcon + " " + defobj.iconClass.delClassName + "\"></span></a>"
                            + "<a><span class=\"glyphicon " + elemobj.ctrlIcon.togIcondown + " " + defobj.iconClass.togClassName + " \"></span></a>"
                            + "</div>"
                            + "<div class=\"" + defobj.formClass.labelName + "\">" + elemobj.ctrlLabelText + "</div>"
                            + "<input type=\"hidden\" value=\"\" class=\"" + defobj.formClass.hidInputName + "\" id=\"" + elemobj.ctrlId + "\"/></div>"
                            + "<div class=\"" + defobj.dropContainerClass + " hidden \">"
                            + "<input type=\"search\" class=\"" + defobj.formClass.searchName + "\" />"
                            + "<ul></ul></div></div>");
        }

        function BindListOptions(elem) {
            var ulList = $(elem).find('ul');
            
            for (var i = 0; i < elemobj.ctrlList.length; i++) {
                
                if(elemobj.ctrlList[i].value == elemobj.ctrlSelected)
                {
                    var setDefaultSelected = $(elem).find('.' + defobj.formClass.labelName);
                    $(elem).find('.' + defobj.formClass.labelName).html(elemobj.ctrlList[i].text).next('input').val(elemobj.ctrlList[i].value);
                    
                }
                $(ulList).append("<a onclick=\"AssignValue('" + elemobj.ctrlId + "','" + elemobj.ctrlList[i].text + "','" + elemobj.ctrlList[i].value + "')\" ><li>" + elemobj.ctrlList[i].value + " " + elemobj.ctrlList[i].text + "</li><a/>");
            }
        }

        function BindToggleControl(elem) {
            var toggleCtrl = $(elem).find('.' + defobj.iconClass.togClassName);
            var containerCtrl = $(elem).find('.' + defobj.dropContainerClass);
            $(toggleCtrl).on('click', function () {
                var togglestate = $(containerCtrl).hasClass('hidden');

                if (togglestate) {
                    $(containerCtrl).removeClass('hidden');
                    $(toggleCtrl).removeClass(elemobj.ctrlIcon.togIcondown).addClass(elemobj.ctrlIcon.togIconup);
                }
                else {

                    $(containerCtrl).addClass('hidden');
                    $(toggleCtrl).removeClass(elemobj.ctrlIcon.togIconup).addClass(elemobj.ctrlIcon.togIcondown);
                }
            });
        }

        function BindSearchList(elem) {
            var search = $(elem).find('.' + defobj.formClass.searchName);
            var ulList = $(elem).find('ul');
            $(search).on('keyup', function () {
                if ($(search).val() != "") {
                    $(ulList).html('');
                    for (var i = 0; i < elemobj.ctrlList.length; i++) {
                        if (elemobj.ctrlList[i].text.toLowerCase().indexOf($(this).val().toLowerCase()) > -1) {
                            $(ulList).append("<a onclick=\"AssignValue('" + elemobj.ctrlId + "','" + elemobj.ctrlList[i].text + "','" + elemobj.ctrlList[i].value + "')\" ><li>" + elemobj.ctrlList[i].value + " " + elemobj.ctrlList[i].text + "</li></a>");
                        }
                    }
                } else {
                    $(ulList).html('');

                    BindListOptions(elem)
                }
            });
        }

        function BindClearControl(elem) {
            var clearCtrl = $(elem).find('.' + defobj.iconClass.delClassName)

            $(clearCtrl).on('click', function () {
                $('#' + elemobj.ctrlId).val('').prev('.' + defobj.formClass.labelName).html(elemobj.ctrlLabelText);
            });
        }
    };

}(jQuery));