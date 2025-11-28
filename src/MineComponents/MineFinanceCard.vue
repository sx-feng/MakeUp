<template>
  <section class="card finance-card">
    <div class="finance-row">
      <div>
        <p class="label">账户余额</p>
        <p class="amount">¥ {{ money.balance }}</p>
      </div>
      <div class="right">
        <p class="label">可提现</p>
        <p class="withdraw">¥ {{ money.withdraw }}</p>
      </div>
    </div>

    <button class="primary-btn" @click="$emit('withdraw')">立即提现</button>
  </section>
</template>

<script>
export default {
  name: "MineFinanceCard",
  props: {
    money: Object
  },
  emits: ["withdraw"]
};
</script>

<style scoped>
.finance-card {
  padding: 1rem;
  margin-top: 0.75rem;
}
.finance-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label {
  color: #80808f;
}
.amount {
  font-size: 1.7rem;
  font-weight: 700;
}
.withdraw {
  font-size: 1.1rem;
  font-weight: 700;
  color: #16a34a;
}
.primary-btn {
  width: 100%;
  margin-top: 0.85rem;
  padding: 0.9rem 1rem;
  border: none;
  border-radius: 0.9rem;
  background: linear-gradient(90deg, #ff6f9d, #ff2f6d);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
}
</style>
