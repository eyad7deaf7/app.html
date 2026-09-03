document.addEventListener('DOMContentLoaded', function() {
  const data = {
    balance: 12450.00,
    income: 4200.00,
    expenses: 1750.00,
    progressPct: 42,
    categories: [
      { name: 'الطعام', pct: 60, amount: 450, color: '#00b894' },
      { name: 'النقل', pct: 30, amount: 220, color: '#0984e3' }
    ],
    transactions: [
      { title: 'بقالة', meta: 'الطعام • Sep 3, 2026', amount: -85.00 }
    ]
  };

  function formatCurrency(n){
    const sign = n < 0 ? '-' : '';
    return sign + '$' + Math.abs(n).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  }

  // Balance and summary
  const balanceEl = document.querySelector('.balance-card .amount');
  if (balanceEl) balanceEl.innerHTML = `<small>$</small>${data.balance.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}`;

  const incomeEl = document.querySelector('.summary-item.income .amount');
  if (incomeEl) incomeEl.textContent = `+${data.income.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}`;

  const expenseEl = document.querySelector('.summary-item.expense .amount');
  if (expenseEl) expenseEl.textContent = `-${data.expenses.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}`;

  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) progressBar.style.width = data.progressPct + '%';

  // Categories
  const catList = document.querySelector('.category-spending-list');
  if (catList) {
    catList.innerHTML = '';
    data.categories.forEach(c=>{
      const el = document.createElement('div');
      el.className = 'category-item';
      el.innerHTML = `
        <div class="category-name">${c.name}</div>
        <div class="category-bar-wrapper">
          <div class="category-bar" style="width:${c.pct}%; background-color:${c.color};"></div>
        </div>
        <div class="category-amount">$${c.amount}</div>
      `;
      catList.appendChild(el);
    });
  }

  // Transactions
  const txList = document.querySelector('.transaction-list');
  if (txList) {
    txList.innerHTML = '';
    data.transactions.forEach(t=>{
      const item = document.createElement('div');
      item.className = 'transaction-item';
      item.innerHTML = `
        <div>
          <strong>${t.title}</strong>
          <div style="font-size:0.8rem;color:#a0a0a0;">${t.meta}</div>
        </div>
        <div style="color:${t.amount<0? '#ef4444':'#00b894'}; font-weight:600;">
          ${formatCurrency(t.amount)}
        </div>
      `;
      txList.appendChild(item);
    });
  }

  // Simple search filter
  const searchInput = document.querySelector('input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener('input', function(e){
      const q = e.target.value.trim().toLowerCase();
      const items = Array.from(document.querySelectorAll('.transaction-item'));
      items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

});
