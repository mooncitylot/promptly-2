// @ts-nocheck
/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  // Clear existing data
  await knex('prompts').del()

  // Insert sample prompts
  await knex('prompts').insert([
    {
      title: 'Creative Writing Assistant',
      prompt:
        'You are a creative writing assistant. Help me write a short story about a character who discovers a mysterious door in their basement. The story should be engaging and include elements of mystery and adventure.',
    },
    {
      title: 'Code Review Helper',
      prompt:
        'You are an expert software developer. Review the following code and provide feedback on: 1) Code quality and best practices 2) Potential bugs or issues 3) Performance improvements 4) Security concerns. Be constructive and specific in your feedback.',
    },
    {
      title: 'Travel Planning Guide',
      prompt:
        'You are a travel expert. Help me plan a 5-day trip to [destination]. Include recommendations for: 1) Must-see attractions 2) Local restaurants and cuisine 3) Transportation options 4) Accommodation suggestions 5) Budget-friendly tips. Make it personalized and practical.',
    },
  ])
}

/**
 * @param {import('knex').Knex} knex
 */
export async function del(knex) {
  await knex('prompts').del()
}
