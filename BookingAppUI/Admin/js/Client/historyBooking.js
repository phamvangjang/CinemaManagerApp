var historyBookingModal = document.getElementById('historyBookingModal');

var btnCancle = document.getElementsByClassName("spanCanle")[0];

var btnHistoryBooking = document.getElementById('btnHistoryBooking')

btnHistoryBooking.onclick = function () {
    historyBookingModal.style.display = "block";
}

btnCancle.onclick = function () {
    historyBookingModal.style.display = "none";
}