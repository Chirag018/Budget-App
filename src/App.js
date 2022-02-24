import AddBudget from './components/AddBudget';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import AddExpense from './components/AddExpense';
import ViewExpenses from './components/ViewExpenses';

function App() {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState();
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpense(budgetId) {
    setShowAddExpense(true);
    setAddExpenseBudgetId(budgetId);
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudget(true)}>Add Budget</Button>
          <Button variant='outline-primary' onClick={ openAddExpense }>Add Expense</Button>
        </Stack>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1rem', alignItems: 'flex-start' }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount, 0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpense(budget.id)}
                onViewExpensesClick={() => setViewExpensesBudgetId(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpense} onViewExpensesClick={() => setViewExpensesBudgetId(UNCATEGORIZED_BUDGET_ID)} />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudget show={showAddBudget} handleClose={() => setShowAddBudget(false)} />
      <AddExpense show={showAddExpense} defaultBudgetId={addExpenseBudgetId} handleClose={() => setShowAddExpense(false)} />
      <ViewExpenses budgetId={viewExpensesBudgetId} handleClose={() => setViewExpensesBudgetId()} />
    </>
  );
}

export default App;
