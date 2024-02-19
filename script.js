document.addEventListener('DOMContentLoaded', function () {
  let selectedSeats = 0;
  const seatPrice = 550;
  const selectedSeatNumbers = [];
  const seatInfoContainer = document.getElementById('fare-info-container');

  function reserveSeat() {
    const seat = this;
    const totalSeatsElement = document.getElementById('total-seats');
    const totalPriceElement = document.getElementById('total-price');
    const seatCountElement = document.getElementById('seat-count');
    const grandTotalElement = document.getElementById('grand-total');

    seatInfoContainer.innerHTML = '';

    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      selectedSeats--;
      totalPriceElement.textContent = parseInt(totalPriceElement.textContent) - seatPrice;
      const seatNumber = parseInt(seat.getAttribute('data-seat-number'));
      const index = selectedSeatNumbers.indexOf(seatNumber);
      if (index !== -1) {
        selectedSeatNumbers.splice(index, 1);
        updateSeatNumber();
      }
    } else if (selectedSeats < 4) {
      seat.classList.add('selected');
      selectedSeats++;
      totalPriceElement.textContent = parseInt(totalPriceElement.textContent) + seatPrice;
      const seatNumber = parseInt(seat.getAttribute('data-seat-number'));
      selectedSeatNumbers.push(seatNumber);
      updateSeatNumber();
    }

    totalSeatsElement.textContent = 8 - selectedSeats;
    seatCountElement.textContent = selectedSeats;
    grandTotalElement.textContent = totalPriceElement.textContent;

    for (const seatNumber of selectedSeatNumbers) {
      const seatSpan = document.querySelector(`button[data-seat-number="${seatNumber}"] span`);
      const fareInfoHTML = `
        <div class="flex justify-around fare-text">
          <div>${seatSpan.textContent}</div>
          <div>Economy</div>
          <div>${seatPrice}</div>
        </div>
      `;
      seatInfoContainer.innerHTML += fareInfoHTML;
    }
  }

  function updateSeatNumber() {
    const seatNumberButton = document.getElementById("total-seats");
    seatNumberButton.textContent = selectedSeatNumbers.length;
  }

  var seats = document.querySelectorAll('.seat');

  for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener("click", reserveSeat);
    seats[i].setAttribute("data-seat-number", i + 1);
  }
});

function applyCoupon() {
  const couponInput = document.getElementById('coupon');
  const grandTotalElement = document.getElementById('grand-total');
  const couponCode = couponInput.value;

  const totalPrice = parseFloat(document.getElementById('total-price').innerText);
  let discountedPrice = totalPrice;

  switch (couponCode) {
    case 'NEW15':
      discountedPrice = totalPrice * 0.85;
      break;
    case 'Couple 20':
      discountedPrice = totalPrice * 0.8;
      break;
    default:
      alert('Invalid coupon code. Please enter the correct code.');
      return;
  }

  grandTotalElement.innerText = discountedPrice.toFixed(2);
  couponInput.disabled = true;
  document.getElementById('apply-coupon').disabled = true;
  document.getElementById('coupon-section').style.display = 'none';
}
