// disable a button after its clicked, this is needed for CSS buttons made out of <ahref>
function disabledClickHandler(evt) {
    return false;
}

function enabledClickHandler(evt) {
    return true;
}

// disable any buttons including input buttons and any href derived CSS buttons
function disableBtnWithNoCursorChange(btnId) {
    var btn = document.getElementById(btnId);
    btn.disabled = true;
    btn.onclick = disabledClickHandler;
}

// disable any buttons including input buttons and any href derived CSS buttons
function disableBtn(btnId) {
    document.body.style.cursor='wait';
    var btn = document.getElementById(btnId);
    btn.disabled = true;
    btn.onclick = disabledClickHandler;
}

function disableBtnWithAutoEnable(btnId, secs) {
    disableBtn(btnId);
    setTimeout("enableBtn('" + btnId + "')", secs*1000);
}

function enableBtn(btnId) {
    document.body.style.cursor='default';
    var btn = document.getElementById(btnId);
    btn.disabled = false;
    btn.onclick = enabledClickHandler;
}

// set the css style.display to "block" on element progressDiv by ID
function showBlock(element) {
    document.getElementById(element).style.display = 'block';
}

// set the css style.display to "block" on element progressDiv by ID
function showNone(element) {
    document.getElementById(element).style.display = 'none';
}

// set the css style.display to ""
function showHO(element) {
    document.getElementById(element).style.display = '';
}

// submit a html form specified by the given name via javascript
function submitForm(formName) {
    var theForm = document.forms[formName];
    theForm.submit();
}

// toggle a html element by its ID
function toggle(toggleId) {
    var x = document.getElementById(toggleId);
    if (x.style.display == "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}

// toggle any type of html element linked with an open/close image
function toggleOpenClose(id) {
    if (document.getElementById('toggle_'+id).style.display == 'block') {
        document.getElementById('toggle_'+id).style.display = 'none';
        document.getElementById('open_'+id).src = "/images/open.jpg";
    } else {
        document.getElementById('toggle_'+id).style.display = 'block';
        document.getElementById('open_'+id).src = "/images/close.jpg";
    }
}

// open a popup window and write the string to the document
function displayMessageInPopup(str, width, height) {
    var newWindow=window.open("", "popup", "width=" + width + ",height=" + height + ",toolbar=no,scrollbars=no,menubar=no");
    newWindow.document.write(str);
    newWindow.document.close();
    newWindow.focus();
}

function newSizedWindow(str, width, height) {
    newWindow(str, "popup", width, height, "scrollbars");
}

function newSizedResizableWindow(url, width, height, resizable) {
    newWindow(url, "popup", width, height, "scrollbars,resizable="+resizable);
}

function newWindow(url, name, width, height, params) {
    var completeParams = "height="+height+",width="+width ;
    if(params != null) {
        completeParams = completeParams +","+params ;
    }
    popup = window.open(url, name , completeParams );
    popup.focus();
}

function scrollToTarget(targetID) {
    var theElement = document.getElementById(targetID);
    if(theElement != null) {
        var yCoord = findPosY(theElement);
        window.scrollTo(0, yCoord);
    }
}

function findPosY(obj) {
    var curtop = 0;
    if(obj.offsetParent) {
        while(1) {
            curtop += obj.offsetTop;
            if(!obj.offsetParent) {
                break;
            }
            obj = obj.offsetParent;
        }
    }
    else if(obj.y) {
        curtop += obj.y;
    }
    return curtop;
}

function findPosX(obj) {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) {
            curleft += obj.offsetLeft;
            if(!obj.offsetParent) {
                break;
            }
            obj = obj.offsetParent;
        }
    else if(obj.x) {
        curleft += obj.x;
    }
    return curleft;
}

//checks if an element has a class 
function hasClass(id,cls) {
	var ele = Document.getElementById(id);
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

//adds a class
function addClass(id,cls) {
	var ele = Document.getElementById(id);
	if (ele && !this.hasClass(id,cls)) {
		ele.className += " "+cls;
	}
}

//removes a class
function removeClass(id,cls) {
	var ele = Document.getElementById(id);
	if (hasClass(id,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

// toggle a html element by its ID
function toggleClassName(id, classid) {
    if (hasClass(id, classid)) {
        removeClass(id, classid);
    }
    else {
        addClass(id, classid);
    }
}

// break out a page that opens in an iframe and open it in the main browser window instead
function breakout() {
    if (window.top != window.self) {
        var windowName = window.self.name;
        if (windowName != null && windowName == 'payerAuthWindow') { // iframe that we want to break out & no affect on all other windows
            window.top.location=window.self.location;
        }
    }
}

function switchInnerHtml(obj, newText) {
    if(obj.oldText){
    obj.innerHTML = obj.oldText;
    obj.oldText = null;
    } else {
        obj.oldText = obj.innerHTML;
        obj.innerHTML = newText;
    }
}

//Returns the money if the provided string translates to correctly formatted money and if not, returns 0. For example 1,000 is valid and 1,00 is not.
function getMoneyFromStr(moneyStr){
    var currency = /^(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    if(currency.test(moneyStr)){
        return moneyStr;

    }else{
        return 0;
    }
}

