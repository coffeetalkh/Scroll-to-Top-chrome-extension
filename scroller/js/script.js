$(document).ready(function() {

    /*scroller class, that contains:
        _load();
        _createElements();
        _checkPosition();
        _checkState();
        _createObject();
    */
    function scroller(){
        this.maxHeight = 450; //show scroller button after specific value.
        this.fadeSpeed = 500; //object fade speed.
        this.imgSrc = chrome.extension.getURL("img/transparent.png"); //transparent atrribute for img object.
        this.obj = "";

        //load important parts for loading plugin.
        this.load = function() {
            this.createElements();
            this.checkPosition();
            this.checkState();
        }
        
        //create html objects with specific id and atrributes.
        this.createElements = function() {
            this.createObject('ul', 'smmain', 'body', true); //plugin main form. 
            this.createObject('li', 'smscroller', '#smmain', true); //scroll button element.
            this.createObject('img', 'smscroller-img', '#smscroller', true); //scroll button image.
            this.createObject('li', 'smright', '#smmain', false); //right button element.
            this.createObject('img', 'smright-img', '#smright', true); //right button image.
            this.createObject('li', 'smleft', '#smmain', false); //left button element.
            this.createObject('img', 'smleft-img', '#smleft', true); //left button image.

        }
        
        //determine plugin position in page.
        this.checkPosition = function() {
            if ( localStorage.position == "left" ) {
                $('#smmain').addClass('smleftposition');
            }
            else{
                $('#smmain').addClass('smrightposition');
            }
        }
        
        //check plugin state, if window height value is bigger than maxHeight then show plugin.
        this.checkState = function() {
            if ( $(window).scrollTop() >= this.maxHeight  ) {
                $('#smmain').fadeIn(this.fadeSpeed);
            }
            else{
                $('#smmain').fadeOut(this.fadeSpeed);
            }
        }
        
        //create html objects
        this.createObject = function( ObjectName, idName, parent, showStatus ) {
            this.obj = document.createElement(ObjectName);
            this.obj.id = idName;

            if ( ObjectName == 'img' )
                this.obj.src = this.imgSrc;

            $(parent).prepend(this.obj);

            if ( showStatus == false ) {
                $('#' + idName).hide();
            }

        }
    }


    var scroller = new scroller();
    scroller.load();


    //******************Events*******************

    $(window)._scrollable();
    
    $('#smscroller').mouseover(function(){
        if ( $('#smmain').hasClass('smrightposition') ){
            $('#smright').fadeIn(300).slideDown(100);
        }
        else{
            $('#smleft').fadeIn(300).slideDown(100);
        }
    }).click(function(){
        $.scrollTo( 0, 800, {queue:true});
    });

    $('#smright').click(function(){
        $('#smmain').removeClass('smrightposition');
        $('#smmain').addClass('smleftposition');
        
        $('#smleft').hide();
        $('#smright').hide();
        scroller.checkState();
        localStorage.position = 'left';
    });

    $('#smleft').click(function(){
        $('#smmain').removeClass('smleftposition');
        $('#smmain').addClass('smrightposition');
        $('#smleft').hide();
        $('#smright').hide();
        scroller.checkState();
        localStorage.position = 'right';
    });

    $('#smmain').mouseleave(function(){
        $('#smright').fadeOut(scroller.fadeSpeed);
        $('#smleft').fadeOut(scroller.fadeSpeed);
        scroller.checkState();
    });

    $(window).scroll(function(){
        scroller.checkState();
    });
   
});
