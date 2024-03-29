<script>
// Function to check if all required fields are filled
function checkRequiredFields() {
    const investmentValue = document.getElementById('investmentValue').value.trim();
    const loanAmount = document.getElementById('loanAmount').value.trim();
    const interestRate = document.getElementById('interestRate').value.trim();
    const loanTermYears = document.getElementById('loanTermYears').value.trim();
    
    // Enable or disable the Next button based on the presence of values in required fields
    const nextButton = document.getElementById('nextButton');
    if (investmentValue && loanAmount && interestRate && loanTermYears) {
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
    }
}

// Add event listeners to required input fields to check them on input
document.getElementById('investmentValue').addEventListener('input', checkRequiredFields);
document.getElementById('loanAmount').addEventListener('input', checkRequiredFields);
document.getElementById('interestRate').addEventListener('input', checkRequiredFields);
document.getElementById('loanTermYears').addEventListener('input', checkRequiredFields);


// Calculate the ROI
function calculateROI(event) {
    event.preventDefault(); // This prevents the form from being submitted
    const investmentValue = parseFloat(document.getElementById('investmentValue').value);
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTermYears = parseFloat(document.getElementById('loanTermYears').value);
    const rentalIncome = parseFloat(document.getElementById('rentalIncome').value);
    const vacantWeeks = parseFloat(document.getElementById('vacantWeeks').value);
    const rates = parseFloat(document.getElementById('rates').value);
    const insurance = parseFloat(document.getElementById('insurance').value);
    const propertyMaintenance = parseFloat(document.getElementById('maintenance').value);
    const managementFee = parseFloat(document.getElementById('managementFee').value);
    const otherFee = parseFloat(document.getElementById('otherFee').value);
   
    // Calculating principal and interest payments
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const loanTermMonths = loanTermYears * 12;
    const principalAndInterestMonthly = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
    const principalAndInterestAnnualCashFlow = (principalAndInterestMonthly * 12) + rentalIncome * (52 - vacantWeeks) - rates - insurance - propertyMaintenance - managementFee - otherFee;
    const principalAndInterestNetYield = (principalAndInterestAnnualCashFlow / investmentValue) * 100;
    const principalAndInterestNetYieldAmount = principalAndInterestAnnualCashFlow;

    // Calculating interest-only payments
    const interestMonthly = (loanAmount * annualInterestRate / 12) / 100;
    const interestAnnualCashFlow = (interestMonthly * 12) + rentalIncome * (52 - vacantWeeks) - rates - insurance - propertyMaintenance - managementFee - otherFee;
    const interestNetYield = (interestAnnualCashFlow / investmentValue) * 100;
    const interestNetYieldAmount = interestAnnualCashFlow;

    // Calculate net yield in dollar value
    const principalAndInterestNetYieldDollar = principalAndInterestAnnualCashFlow / investmentValue;
    const interestNetYieldDollar = interestAnnualCashFlow / investmentValue;

    // Update the UI with calculated values
    document.getElementById('principalAndInterestWeeklyReturn').innerHTML = "$" + (principalAndInterestMonthly / 4.34524).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('principalAndInterestFortnightlyReturn').innerHTML = "$" + ((principalAndInterestMonthly / 4.34524) * 2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('principalAndInterestMonthlyReturn').innerHTML = "$" + principalAndInterestMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('principalAndInterestAnnualCashFlow').innerHTML = "$" + principalAndInterestAnnualCashFlow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('principalAndInterestNetYield').innerHTML = principalAndInterestNetYield.toFixed(2) + "%";

    document.getElementById('interestWeeklyReturn').innerHTML = "$" + (interestMonthly / 4.34524).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('interestFortnightlyReturn').innerHTML = "$" + ((interestMonthly / 4.34524) * 2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('interestMonthlyReturn').innerHTML = "$" + interestMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('interestAnnualCashFlow').innerHTML = "$" + interestAnnualCashFlow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('interestNetYield').innerHTML = interestNetYield.toFixed(2) + "%";


    showEmailButton();
}

// Update annual expense in real time
window.addEventListener('DOMContentLoaded', function() {
    const ratesInput = document.getElementById('rates');
    const insuranceInput = document.getElementById('insurance');
    const propertyMaintenanceInput = document.getElementById('maintenance');
    const managementFeeInput = document.getElementById('managementFee');
    const otherFeeInput = document.getElementById('otherFee');
    
    ratesInput.addEventListener('input', updateAnnualExpenses);
    insuranceInput.addEventListener('input', updateAnnualExpenses);
    propertyMaintenanceInput.addEventListener('input', updateAnnualExpenses);
    managementFeeInput.addEventListener('input', updateAnnualExpenses);
    otherFeeInput.addEventListener('input', updateAnnualExpenses);

    function updateAnnualExpenses() {
        const rates = parseFloat(ratesInput.value) || 0;
        const insurance = parseFloat(insuranceInput.value) || 0;
        const maintenance = parseFloat(propertyMaintenanceInput.value) || 0;
        const managementFee = parseFloat(managementFeeInput.value) || 0;
        const otherFee = parseFloat(otherFeeInput.value) || 0;
        // Calculate annual expenses
        const annualExpenses = rates + insurance + maintenance + managementFee + otherFee;
        // Set the calculated annual expenses value to the annual expenses text
        document.getElementById('annualExpenses').textContent = '$' + annualExpenses;
    }
});

//hide email results button on load
window.onload = function() {
    hideEmailButton();
};

//show email results button
function showEmailButton(){
  const emailButton = document.getElementById('emailResults');
     if (emailButton) {
       emailButton.style.display = 'inline-block';
  }
}

//hide email results button
function hideEmailButton(){
    const emailButton = document.getElementById('emailResults');
    if (emailButton) {
        emailButton.style.display = 'none';
    }
}

// Change tab on click of the 'Next' button'
function changeTab(tab2) {
    event.preventDefault(); // Prevent form from submitting on button click
    var selectedTab = document.getElementById(tab2);
    if (selectedTab) {
      selectedTab.click();
    }
}
  
//reset the calculator on click
function resetCalc(){
     var element = document.getElementById("investmentCalc");
     var element2 = document.getElementById("investmentCalc2");
     element.reset();
     element2.reset();
         
   // Reset calculated data elements
    document.getElementById('principalAndInterestWeeklyReturn').innerHTML = "$0";
    document.getElementById('principalAndInterestFortnightlyReturn').innerHTML = "$0";
    document.getElementById('principalAndInterestMonthlyReturn').innerHTML = "$0";
    document.getElementById('principalAndInterestAnnualCashFlow').innerHTML = "$0";
    document.getElementById('principalAndInterestNetYield').innerHTML = "$0";
    document.getElementById('interestWeeklyReturn').innerHTML = "$0";
    document.getElementById('interestFortnightlyReturn').innerHTML = "$0";
    document.getElementById('interestMonthlyReturn').innerHTML = "$0";
    document.getElementById('interestAnnualCashFlow').innerHTML = "$0";
    document.getElementById('interestNetYield').innerHTML = "$0";
        
   //hide email results button
    hideEmailButton();
}

// email the results on button click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('emailResults').addEventListener('click', function() {       
        const principalAndInterestWeeklyReturn = document.getElementById('principalAndInterestWeeklyReturn').innerHTML;
        const principalAndInterestFortnightlyReturn = document.getElementById('principalAndInterestFortnightlyReturn').innerHTML;
        const principalAndInterestMonthlyReturn = document.getElementById('principalAndInterestMonthlyReturn').innerHTML;
        const principalAndInterestAnnualCashFlow = document.getElementById('principalAndInterestAnnualCashFlow').innerHTML;
        const principalAndInterestNetYield = document.getElementById('principalAndInterestNetYield').innerHTML;

        const interestWeeklyReturn = document.getElementById('interestWeeklyReturn').innerHTML;
        const interestFortnightlyReturn = document.getElementById('interestFortnightlyReturn').innerHTML;
        const interestMonthlyReturn = document.getElementById('interestMonthlyReturn').innerHTML;
        const interestAnnualCashFlow = document.getElementById('interestAnnualCashFlow').innerHTML;
        const interestNetYield = document.getElementById('interestNetYield').innerHTML;

        // Create the mailto
        const subject = 'NZ Mortgages - Investment Calculation';
        const body = `Principal and Interest:\nWeekly Return: ${principalAndInterestWeeklyReturn}\nFortnightly Return: ${principalAndInterestFortnightlyReturn}\nMonthly Return: ${principalAndInterestMonthlyReturn}\nAnnual Cash Flow: ${principalAndInterestAnnualCashFlow}\nNet Yield: ${principalAndInterestNetYield}\n\nInterest Only:\nWeekly Return: ${interestWeeklyReturn}\nFortnightly Return: ${interestFortnightlyReturn}\nMonthly Return: ${interestMonthlyReturn}\nAnnual Cash Flow: ${interestAnnualCashFlow}\nNet Yield: ${interestNetYield}`;

        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // open up mailing software with mailto content
        window.location.href = mailtoLink;
    });
});

</script>