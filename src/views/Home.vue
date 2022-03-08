<template>
<div>
    <div v-show="showAddTask">
    <AddTask @add-task="addTask" />
    </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</div>
</template>

<script>
    import Tasks from './components/Tasks'
    import AddTask from './components/AddTask'

    export default {
        name: 'HomePage',
        components: {
            Tasks,
            AddTask
        },
        // eslint-disable-next-line vue/no-shared-component-data
        data: {
            tasks: []
        },
        methods: {
        async addTask(task) {
            const res = await fetch('api/tasks', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(task)
            })

            const data = await res.json()

            this.tasks = [...this.tasks, data]
        },
        async deleteTask(id) {
            if(confirm('Are you sure?')) {
                const res = await fetch(`api/tasks/${id}`, {
                method: 'DELETE'
                })
                res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error Deleting task')
            }
        },
        async toggleReminder(id) {
            const taskToToggle = await this.fetchTask(id)
            const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
            // eslint-disable-next-line no-unused-vars
            const res = await fetch(`api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(updTask),
            })

            const data = await res.json()

        // eslint-disable-next-line no-undef
        this.tasks = this.tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task)
        },
        async fetchTasks() {
            const res = await fetch('api/tasks')

            const data = await res.json()
            return data
        },
        async fetchTask(id) {
            const res = await fetch(`api/tasks/${id}`)

            const data = await res.json()

            return data
        }
    },
    async created() {
        this.tasks = await this.fetchTasks()
    }
    }
</script>