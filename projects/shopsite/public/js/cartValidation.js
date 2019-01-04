const computeQtyChange = (productId, rowNum) => {
  updateProductAmountInTheCart(productId, rowNum);
};

const getQtyField = rowNum => {
  const qty = document.getElementById(`qty-row-${rowNum}`);
  if (!qty.value || Number.isNaN(qty.value) || Number(qty.value) === 0) {
    qty.value = 1;
  }

  return qty;
};

//Update the sub-total field as well as the running total on a qty change
const updateSubTotal = rowNum => {
  const qty = getQtyField(rowNum);
  const price = document.getElementById(`unit-price-row-${rowNum}`).value;
  document.getElementById(`sub-total-row-${rowNum}`).value = (
    qty.value * price
  ).toFixed(2);
};

const updateRunningTotal = () => {
  const productList = Array.from(
    document.querySelectorAll("input[id*='sub-total-row']")
  );
  let runningTotal = 0;
  productList.forEach(fieldElement => {
    runningTotal += Number(fieldElement.value);
  });

  document.getElementById("runningTotal").innerHTML =
    "$" + runningTotal.toFixed(2);
};

//Remove a product from the Cart for a given productId
const removeProductFromCart = (productId, rowId) => {
  fetch("/cart/deleteProduct", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: productId })
  })
    .then(response => response.json())
    .then(response => {
      document.getElementById(rowId).remove();
      updateRunningTotal();
    })
    .catch(error => {
      console.log("Error: " + error);
      throw error;
    });
};

//Update the cart product amount
const updateProductAmountInTheCart = (productId, rowNum) => {
  const qty = getQtyField(rowNum);
  fetch("/cart/updateCartAmount", {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ productId: productId, qty: qty.value })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      updateSubTotal(rowNum);
      updateRunningTotal();
    })
    .catch(error => {
      console.log(error);
    });
};
