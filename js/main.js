$(function() {
    var read_more = $("a[href='#read-more']");
    var nav_btn = $("a[href='#nav-button']");
    var old_page_num;

    $(read_more).on("click", function() {
        $(this).animate({"fontSize": "1.5rem"}, 100, function() {
            $(this).animate({"fontSize": "2rem"}, 100, function() {
                $(".text-section").removeClass("hidden disabled").addClass("active");
                $(".progress-section .progress-bar").removeClass("unloaded").addClass("loaded");
                $(".title-section").hide("blind", {direction: "right"}, 350, function() {
                    $("i", nav_btn).removeClass("fa-bars").addClass("fa-arrow-left");                    
                    $(".left-sidebar").delay(50).show("slide", {
                        easing: "easeOutExpo",
                        direction: "left"}, 300, function() {
                        old_page_num = $(".page-number:first-of-type").text();
                        $(".page-number:first-of-type").text(changePageNumber(old_page_num));
                    });
                    $(".text-section > .content").delay(50).removeClass("hidden disabled")
                        .addClass("active");
                });
            });
        });
        
    });

    $(nav_btn).on("click", function() {
        if ($(nav_btn).find("i").hasClass("fa-arrow-left")) {
            $(".text-section > .content").removeClass("active").addClass("disabled")
            .delay(100).queue(function() {
                $(this).addClass("hidden").dequeue();
                $(".text-section").removeClass("active").addClass("disabled")
                .delay(200).queue(function() {
                    $(this).addClass("hidden").dequeue();
                });
            });
            $("i", nav_btn).removeClass("fa-arrow-left").addClass("fa-bars");
            $(".title-section").delay(100).show("blind", {direction: "right"}, 200);
            $(".left-sidebar").delay(100).hide("slide", {
                easing: "easeInExpo",
                direction: "left"}, 200);
            $(".progress-section .progress-bar").removeClass("loaded").addClass("unloaded");
            old_page_num = $(".page-number:first-of-type").text();
            $(".page-number:first-of-type").text(changePageNumber(old_page_num));
        }
    });
});

function changePageNumber(oldText) {
    return oldText === "00" ? "01" : "00";
}