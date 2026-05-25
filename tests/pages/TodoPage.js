/**
 * Page Object Model for the Todo List application.
 * Encapsulates all selectors and user interactions.
 */
export class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page

    // Form
    this.todoInput = page.getByTestId('todo-input')
    this.addButton = page.getByTestId('add-todo-btn')

    // List
    this.todoList = page.getByTestId('todo-list')
    this.emptyMessage = page.getByTestId('todo-list-empty')
    this.todoCount = page.getByTestId('todo-count')
  }

  /** Navigate to the app home page */
  async goto() {
    await this.page.goto('/')
  }

  /**
   * Add a new todo via the form.
   * @param {string} text
   */
  async addTodo(text) {
    await this.todoInput.fill(text)
    await this.addButton.click()
  }

  /** Returns a locator for all todo items in the list. */
  get todoItems() {
    return this.page.getByTestId('todo-item')
  }

  /**
   * Returns an array of description strings for all visible todo items.
   * @returns {Promise<string[]>}
   */
  async getDescriptions() {
    return this.page.getByTestId('todo-description').allTextContents()
  }

  /**
   * Click the toggle (done/undone) button of the item at `index` (0-based).
   * @param {number} index
   */
  async toggleDone(index) {
    await this.todoItems.nth(index).getByTestId('toggle-done-btn').click()
  }

  /**
   * Click the Edit button of the item at `index` (0-based).
   * @param {number} index
   */
  async clickEdit(index) {
    await this.todoItems.nth(index).getByTestId('edit-btn').click()
  }

  /**
   * Clear the inline edit input and type new text.
   * @param {string} text
   */
  async fillEditInput(text) {
    const editInput = this.page.getByTestId('edit-input')
    await editInput.clear()
    await editInput.fill(text)
  }

  /** Click the Save button in edit mode. */
  async saveEdit() {
    await this.page.getByTestId('save-edit-btn').click()
  }

  /** Click the Cancel button in edit mode. */
  async cancelEdit() {
    await this.page.getByTestId('cancel-edit-btn').click()
  }

  /**
   * Press a keyboard key while the edit input is focused.
   * @param {string} key - e.g. 'Enter' or 'Escape'
   */
  async pressInEditInput(key) {
    await this.page.getByTestId('edit-input').press(key)
  }

  /**
   * Click the Delete button of the item at `index` (0-based).
   * @param {number} index
   */
  async deleteTodo(index) {
    await this.todoItems.nth(index).getByTestId('delete-btn').click()
  }
}
