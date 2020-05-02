$(document).ready(function () {
    var table = $('#search_table').DataTable();
    var token = {};
    var selectedFilter = "Unlisted";
    $(".search_form").submit((event) => {
        console.log(event);
        event.preventDefault();
        event.stopPropagation();
        fetchFC().then(res => {
            updateTable(res);
        });
    });

    $(".search_filter_options a").on("click", (event) => {
        console.log($(event.target).text());
        var selectedOption = $(event.target).text();
        $(".search_filter_dropdown").html(selectedOption + " &nbsp;&nbsp;<span class='caret'></span>");
    });

    $("#search_table").on("click", ".fc_option", (event) => {
        var selectedOption = $(event.target).text();
        var status = "UNLISTED";
        var id = $(event.target).attr("data-id");
        if (selectedOption === "Approve") {
            status = "LISTED";
        } else if (selectedOption === "Delete") {
            status = "DELETED";
        }
        var cnf = window.confirm("Are you want to change the status to " + status);
        if (cnf) {
            updateStatus({ id: "5eacae9532b3a4001189e8fc", status: status }).then(() => {
                fetchFC().then(res => updateTable(res));
            });
        }
    });

    function updateTable(res) {
        function toDataTable(responseData) {
            var arr = [];
            responseData.forEach(element => {
                var a = [];
                a.push(arr.length + 1);
                a.push(element.user.id);
                a.push(element.name ? element.name : "-");
                a.push(element.state ? element.state : "-");
                a.push(element.city ? element.city : "-");
                a.push(element.address ? element.address : "-");
                var timing = "";
                if (element.timings.lunch && element.timings.lunch.start && element.timings.lunch.end) {
                    timing = "Lunch: " + element.timings.lunch.start + " - " + element.timings.lunch.end + "<br/>";
                }
                if (element.timings.dinner && element.timings.dinner.start && element.timings.dinner.end) {
                    timing += "Dinner: " + element.timings.dinner.start + " - " + element.timings.dinner.end;
                }
                a.push(timing);
                a.push(element.capacity);
                a.push(element.contactNumber);
                var location = '<button type="button" class="btn btn-indigo btn-sm m-0"><a target="_blank" href="http://www.google.com/maps/place/' + element.lat + ',' + element.long + '">View Map</a></button>';
                a.push(location);
                var dropDown = '<center>' +
                    '    <div class="btn-group fc_option_dropdown">' +
                    '        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">' +
                    '            <span class="caret"></span>' +
                    '            <span class="sr-only">Toggle Dropdown</span>' +
                    '        </button>' +
                    '        <ul class="dropdown-menu dropdown-menu-right fc_options" role="menu">' +
                    '            <li class="fc_option" data-id="' + element.id + '">Approve</li>' +
                    '            <li class="fc_option" data-id="' + element.id + '">Unlist</li>' +
                    '            <li class="fc_option" data-id="' + element.id + '">Delete</li>' +
                    '        </ul>' +
                    '    </div>' +
                    '</center>';
                a.push(dropDown);
                arr.push(a);
            });
            return arr;
        }
        console.log(toDataTable(res));
        table.clear();
        table.rows.add(toDataTable(res)).draw();
    }

    function login() {
        var settings = {
            "url": "http://3.16.206.55:3000/api/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ "emailId": "testuser4@gmail.com", "password": "testuser4" }),
        };

        return new Promise((resolve, reject) => {
            $.ajax(settings).done(function (response) {
                console.log(response);
                token = response;
                resolve(token);
            });
        });
    }

    function fetchFC() {
        var searchText = $(".search").val().trim();
        var selectedOption = $(".search_filter_dropdown").text().trim().toUpperCase();
        var settings = {
            "url": "http://3.16.206.55:3000/api/food-centers?status=" + selectedOption + "&q=" + searchText,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
        };

        return new Promise((resolve, reject) => {
            $.ajax(settings).done(function (response) {
                console.log(response);
                resolve(response);
            });
        });
    }

    function updateStatus(fc) {
        var settings = {
            "url": "http://3.16.206.55:3000/api/food-centers/" + fc.id,
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.token
            },
            "data": JSON.stringify({ status: fc.status }),
        };

        return new Promise((resolve, reject) => {
            $.ajax(settings).done(function (response) {
                console.log(response);
                resolve(response);
            });
        });
    }

    login();
    fetchFC().then(res => updateTable(res));

});