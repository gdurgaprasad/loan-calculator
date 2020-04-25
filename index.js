const loading = document.getElementById("loading");
const results = document.getElementById("results");

document.getElementById("loan-form").addEventListener("submit", function (e) {
  loading.style.display = "block";
  results.style.display = "none";
  setTimeout(calculate, 2500);
  e.preventDefault();
});

function calculate() {
  const loanAmount = document.getElementById("loan-amount");
  const interestRate = document.getElementById("interest-rate");
  const yearsToRepay = document.getElementById("years-to-repay");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const totalLoanAmount = parseFloat(loanAmount.value);
  const interestRatePerMonth = parseFloat(interestRate.value) / 100 / 12;
  const numberOfMonths = parseFloat(yearsToRepay.value) * 12;

  const x = Math.pow(1 + interestRatePerMonth, numberOfMonths);
  const EMI = (totalLoanAmount * x * interestRatePerMonth) / (x - 1);

  if (isFinite(EMI)) {
    monthlyPayment.value = EMI.toFixed(3);
    totalPayment.value = (EMI * numberOfMonths).toFixed(3);
    totalInterest.value = (EMI * numberOfMonths - totalLoanAmount).toFixed(3);
    loading.style.display = "none";
    results.style.display = "block";
  } else {
    showError("Please review your input");
  }
}

function showError(errorMessage) {
  loading.style.display = "none";
  results.style.display = "none";
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("alert-danger");
  errorDiv.appendChild(document.createTextNode(errorMessage));

  const card = document.querySelector("div.card");
  const heading = document.querySelector("h2.heading");

  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 2500);
}

function clearError() {
  document.querySelector("div.alert-danger").remove();
}
