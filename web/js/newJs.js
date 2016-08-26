/**
 * Created with Intellij IDEA.
 * Project name: cashTestConverter.
 * User: Partizanin.
 * Date: 29.03.2015.
 * Time:  15:04.
 * To change this template use File|Setting|Editor|File and Code Templates.
 */

function changedListener(operation) {

    if (operation === "+") {
        countPlus();
    } else if (operation === "-") {
        countMinus();
    } else if (operation === "/") {
        countDivide()
    } else {
        countMultiply();
    }

}

function countPlus() {
    var number1 = $("#plus_num_1").val();
    var number2 = $("#plus_num_2").val();
    if (!!number1 && !!number2) {
        var numbers = {
            "number1": number1,
            "number2": number2
        };

        callToServer(numbers, "+").then(function (dataFromServer) {
            $("#plus_result").text(dataFromServer.result)
        });
    } else {
        $("#plus_result").text("");
    }
}

function countMinus() {
    var number1 = $("#minus_num_1").val();
    var number2 = $("#minus_num_2").val();
    if (!!number1 && !!number2) {
        var numbers = {
            "number1": number1,
            "number2": number2
        };

        callToServer(numbers, "-").then(function (dataFromServer) {
            $("#minus_result").text(dataFromServer.result)
        });
    } else {
        $("#minus_result").text("");
    }
}

function countDivide() {
    var number1 = $("#divide_num_1").val();
    var number2 = $("#divide_num_2").val();
    if (!!number1 && !!number2) {
        var numbers = {
            "number1": number1,
            "number2": number2
        };

        callToServer(numbers, "/").then(function (dataFromServer) {
            $("#divide_result").text(dataFromServer.result)
        });
    } else {
        $("#divide_result").text("");
    }
}

function countMultiply() {
    var number1 = $("#multiply_num_1").val();
    var number2 = $("#multiply_num_2").val();
    if (!!number1 && !!number2) {
        var numbers = {
            "number1": number1,
            "number2": number2
        };

        callToServer(numbers, "*").then(function (dataFromServer) {
            $("#multiply_result").text(dataFromServer.result)
        });
    } else {
        $("#multiply_result").text("");
    }
}

function callToServer(dataFromPage, operation) {
    var data = {
        "operation": operation,
        "data": dataFromPage
    };
    var myData = {
        "jsonData": data
    };
    var defer = $.Deferred();
    $.ajax({
        type: "GET",
        url: "/CalcServlet",
        data: {jsonData: JSON.stringify(myData)},
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        //if received a response from the server
        success: function (jsonData) {

        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },

        complete: function () {
        }

    }).done(function (data) {
        defer.resolve(data);
    }).fail(function (xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    });

    return defer.promise();
}




