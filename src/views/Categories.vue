<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Categories' | localize }}</h3>
        </div>
        <section>
            <Loader v-if="loading"/>

			<div v-else class="row">
                <div class="col s12 m6">
                    <CategoryCreate @created="addNewCategory"/>
                </div>
                <div class="col s12 m6">
                    <CategoryEdit 
                        v-if="categories.length"
                        :categories="categories"
                        :key="categories.length + updateCount"
                        @update="updateCategories"
                    />
                    <p v-else class="center">Создайте категорию</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
    metaInfo() {
        return {
            title: this.$title('Categories')
        }
    },
    data: () => ({
        categories: [],
        loading: true,
        updateCount: 0
    }),
    async mounted() {
        this.categories = await this.$store.dispatch('featchCategories')
        this.loading = false
    },
    methods: {
        addNewCategory(category){
            this.categories.push(category)
        },
        updateCategories(category) {
            const idx = this.categories.findIndex(c => c.id === category.id)
            this.categories[idx].title = category.title
            this.categories[idx].limit = category.limit
            this.updateCount++
        }
    },
    components: {
        CategoryCreate,
        CategoryEdit
    }
}
</script>