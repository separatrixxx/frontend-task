<script lang="ts">
  let codes = [];

  // async function postData() {
  //   const response = await fetch(
  //     "https://v6.exchangerate-api.com/v6/3141f990c68238e3b680d17d/codes",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   return await response.json();
  // }

  // postData().then((data) => {
  //   codes = data.supported_codes;
  // });

  let select1;
  let select2;

  let input1;
  let input2;

  $: if (select1) {
    select1.onchange = select1Change;
  }

  $: if (select2) {
    select2.onchange = select2Change;
  }

  let cur1 = "USD";
  let cur2 = "USD";

  function select1Change() {
    cur1 = (select1 as HTMLInputElement).value;
    getCur(cur1, cur2).then((data) => {
      (input2 as HTMLInputElement).value = String(
        +(input1 as HTMLInputElement).value * data.conversion_rate
      );
    });
  }

  function select2Change() {
    cur2 = (select2 as HTMLInputElement).value;
    getCur(cur1, cur2).then((data) => {
      (input2 as HTMLInputElement).value = String(
        +(input1 as HTMLInputElement).value * data.conversion_rate
      );
    });
  }

  $: if (input1) {
    input1.onchange = input1Change;
  }

  $: if (input2) {
    input2.onchange = input2Change;
  }

  async function getCur(cur1: string, cur2: string) {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/3141f990c68238e3b680d17d/pair/" +
        cur1 +
        "/" +
        cur2,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  function input1Change() {
    getCur(cur1, cur2).then((data) => {
      (input2 as HTMLInputElement).value = String(
        +(input1 as HTMLInputElement).value * data.conversion_rate
      );
    });
  }

  function input2Change() {
    getCur(cur1, cur2).then((data) => {
      (input1 as HTMLInputElement).value = String(
        +(input2 as HTMLInputElement).value / data.conversion_rate
      );
    });
  }
</script>

<main>
  <form>
    <label for="cur1">Валюта1:</label>
    <select id="select1" bind:this={select1}>
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
      <option value="EUR">AUD</option>
      <option value="CNY">CNY</option>
      <option value="CNY">JPY</option>
    </select>
    <input type="number" bind:this={input1} />
  </form>
  <form>
    <label for="cur2">Валюта 2:</label>
    <select id="select2" bind:this={select2}>
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
      <option value="EUR">AUD</option>
      <option value="CNY">CNY</option>
      <option value="CNY">JPY</option>
    </select>
    <input type="number" bind:this={input2} />
  </form>
</main>

<style>
</style>
