# 01 Composition API e ref

In questo esempio vedrai come impostare un componente Vue attraverso la composition API.
Vedrai inoltre come rendere reattiva una variabile attraverso `ref`

```html
<template>
  <div class="home">
    
    <div>
      <button @click="decreaseCounter" class="btn">-</button>
      <span class="counter">{{ counter }}</span>
      <button @click="increaseCounter" class="btn">+</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const counter = ref(0)

const increaseCounter = () => {
  counter.value++
}

const decreaseCounter = () => {
  counter.value--
}
</script>

<style>
.home {
  text-align: center;
  padding: 20px;
}
.btn, .counter {
  font-size: 40px;
  margin: 10px;
}
</style>
```

# 02 Reactive, Non reactive, Two-way data binding

In questo esempio vedrai come rendere reattivi gli oggetti attraverso `reactive` e come dichiarare variabili non reattive.

```html
<template>
  <div class="home">
    
    <h2>{{ appTitle }}</h2>

    <h3>{{ counterData.title }}:</h3>

    <div>
      <button @click="decreaseCounter" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter" class="btn">+</button>
    </div>

    <div class="edit">
      <h4>Edit counter title:</h4>
      <input v-model="counterData.title" type="text">
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'

const appTitle = 'My Ok Counter App'

const counterData = reactive({
  count: 0,
  title: 'My Counter'
})

const increaseCounter = () => {
  counterData.count++
}

const decreaseCounter = () => {
  counterData.count--
}
</script>

<style>
.home {
  text-align: center;
  padding: 20px;
}
.btn, .counter {
  font-size: 40px;
  margin: 10px;
}
.edit {
  margin-top: 60px;
}
</style>
```

# 03 Eventi, Computed, Watch

In questo esempio vedrai:

- come passare argomenti ad un metodo.
- **computed** property
- **watch**. Vedrai inoltre come stare in ascolto di una variabile proveniente da un oggetto `reactive`  

```html
<template>
  <div class="home">
    
    <h2>{{ appTitle }}</h2>

    <h3>{{ counterData.title }}:</h3>

    <div>
      <button @click="decreaseCounter(2)" class="btn">--</button>
      <button @click="decreaseCounter(1)" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter(1, $event)" class="btn">+</button>
      <button @click="increaseCounter(2)" class="btn">++</button>
    </div>

    <p>This counter is {{ oddOrEven }}</p>

    <div class="edit">
      <h4>Edit counter title:</h4>
      <input v-model="counterData.title" type="text">
    </div>

  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const appTitle = 'My Ok Counter App'

const counterData = reactive({
  count: 0,
  title: 'My Counter'
})

watch(() => counterData.count, (newCount) => {
  if (newCount === 20) {
    alert('Way to go! You made it to 20!!')
  }
})

const oddOrEven = computed(() => {
  if (counterData.count % 2 === 0) return 'even'
  return 'odd'
})

const increaseCounter = (amount, e) => {
  counterData.count += amount
}

const decreaseCounter = amount => {
  counterData.count -= amount
}
</script>

<!--

COMPOSITION API

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    myComputedProperty() {
      // perform logic based on a data property
      return 'my result'
    }
  },
  watch: {
    count(newCount, oldCount) {
      if (newCount == 20) alert('asdfasd')
    }
  }
}
</script>
-->

<style>
.home {
  text-align: center;
  padding: 20px;
}
.btn, .counter {
  font-size: 40px;
  margin: 10px;
}
.edit {
  margin-top: 60px;
}
</style>
```

# 04 Lifecicle hooks

In qeusto esempio vedrai i lifecicle hooks. 
La novità è che puoi richiamare i lifecicle hooks più volte in modo da frammentare e orientare il componente ai dati anzichè ai metodi evitando quindi di avere i dati disconnessi logicamente tra di loro, come accade nella options API. 
Scriverai quindi componenti orientati ai dati anzichè ai metodi.

Visita la [documentazione ufficiale](https://vuejs.org/api/composition-api-lifecycle.html)

## Activated, deactivated e Keep Alive

`onActivated`, `onDeactivated` sono lifecicle hooks relativi a componenti `KeepAlive`. Le callback verrano quindi registrate solo se un elemento è inserito nel DOM attraverso il tag `<KeepAlive>`, vedi [keepalive](https://vuejs.org/api/built-in-components.html#keepalive)

```html
<template>
  <div class="home">
    <h2>{{ appTitle }}</h2>

    <h3>{{ counterData.title }}:</h3>

    <div>
      <button @click="decreaseCounter(2)" class="btn">--</button>
      <button @click="decreaseCounter(1)" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter(1, $event)" class="btn">+</button>
      <button @click="increaseCounter(2)" class="btn">++</button>
    </div>

    <p>This counter is {{ oddOrEven }}</p>

    <div class="edit">
      <h4>Edit counter title:</h4>
      <input v-model="counterData.title" type="text" />
    </div>
  </div>
</template>

<script setup>

/* imports */ 

import {
  reactive,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  onUpdated,
  onBeforeUpdate,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from "vue";

/* app title */

const appTitle = "My Ok Counter App";

onMounted(() => {
  console.log("Do stuff related to App Title");
});

/* counter */

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

watch(
  () => counterData.count,
  (newCount) => {
    if (newCount === 20) {
      alert("Way to go! You made it to 20!!");
    }
  }
);

const oddOrEven = computed(() => {
  if (counterData.count % 2 === 0) return "even";
  return "odd";
});

const increaseCounter = (amount, e) => {
  counterData.count += amount;
};

const decreaseCounter = (amount) => {
  counterData.count -= amount;
};

onMounted(() => {
  console.log("Do stuff related to Counter");
});

/* All lifecicle hooks */

onBeforeMount(() => {});
onMounted(() => {});
onBeforeUnmount(() => {});
onUnmounted(() => {});
onUpdated(() => {});
onBeforeUpdate(() => {});
onActivated(() => {});
onDeactivated(() => {});
onErrorCaptured(() => {});
</script>

<style>
.home {
  text-align: center;
  padding: 20px;
}
.btn,
.counter {
  font-size: 40px;
  margin: 10px;
}
.edit {
  margin-top: 60px;
}
</style>

```

# 05 Directives

Oltre al set predefinito di direttive fornite dal core di Vue (come `v-model` o `v-show`), puoi registrare le tue direttive personalizzate.

Puoi definire delle direttive locali al tuo componente o globali.

Per creare una direttiva locale in vue3, dovrai creare un oggetto con il nome della direttiva:

```sh
vAutofocus --> v-autofocus
```

Per creare una direttiva globale, accessibile da ogni componente, basterà esportare la direttiva in un file:

```sh
directives/vAutofocus.js
```

Vedi [Custom directives](https://vuejs.org/guide/reusability/custom-directives.html)

```js
//directives/vAutofocus.js
export const vAutofocus = {
  mounted: (el) => {
    el.focus()
  }
}
```

```html
<template>
  <div class="home">
    
    <h2>{{ appTitle }}</h2>

    <h3>{{ counterData.title }}:</h3>

    <div>
      <button @click="decreaseCounter(2)" class="btn">--</button>
      <button @click="decreaseCounter(1)" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter(1, $event)" class="btn">+</button>
      <button @click="increaseCounter(2)" class="btn">++</button>
    </div>

    <p>This counter is {{ oddOrEven }}</p>

    <div class="edit">
      <h4>Edit counter title:</h4>
      <input v-model="counterData.title" type="text" v-autofocus>
    </div>

  </div>
</template>

<script setup>
/*
  imports
*/

  import { reactive, computed, watch, onMounted } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'

/*
  app title
*/

  const appTitle = 'My Ok Counter App'

  onMounted(() => {
    console.log('Do stuff related to App Title')
  })

/*
  counter
*/

  const counterData = reactive({
    count: 0,
    title: 'My Counter'
  })

  watch(() => counterData.count, (newCount) => {
    if (newCount === 20) {
      alert('Way to go! You made it to 20!!')
    }
  })

  const oddOrEven = computed(() => {
    if (counterData.count % 2 === 0) return 'even'
    return 'odd'
  })

  const increaseCounter = (amount, e) => {
    counterData.count += amount
  }

  const decreaseCounter = amount => {
    counterData.count -= amount
  }

  onMounted(() => {
    console.log('Do stuff related to Counter')
  })

</script>

<!--
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    myComputedProperty() {
      // perform logic based on a data property
      return 'my result'
    }
  },
  watch: {
    count(newCount, oldCount) {
      if (newCount == 20) alert('asdfasd')
    }
  },
  mounted() {
    console.log('mounted')
  },
  unmounted() {
    console.log('unmounted')
  },
  directives: {
    autofocus: {
      mounted(el) {
        el.focus()
      }
    }
  }
}
</script>
-->

<style>
.home {
  text-align: center;
  padding: 20px;
}
.btn, .counter {
  font-size: 40px;
  margin: 10px;
}
.edit {
  margin-top: 60px;
}
</style>
```

# 06 Vue Router

In questo esempio vedremo vue Router e la gestione delle route in vue3.

Creo tre route principali:

- `/`: Home, view `HomeView`
- `/posts`: Posts, view  `PostsView`
- `/postDetails`: Posts, view  `PostDetailsView`

```js
//router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostsView.vue')
    },
    {
      path: '/postDetail/:id',
      name: 'postDetail',
      component: () => import('../views/PostDetailView.vue')
    }
  ]
})

export default router
```

`App.vue` ha due route raggiungibili tramite nav links:

- `/`: Home
- `/posts`: Posts

```html
<!--App.vue-->
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/posts">Posts</RouterLink>
  </nav>

  <RouterView />
</template>
```

`PostsView` contiene la lista dei post. Ogni post è accessibile attraverso un link e l'id del post.

```html
<!--views/PostsView.vue-->
<template>
  <div class="posts">
    <h1>Posts</h1>

    <ul>
      <li>
        <RouterLink to="/postDetail/id1">Post 1</RouterLink>
      </li>
      <li>
        <RouterLink to="/postDetail/id2">Post 2</RouterLink>
      </li>
      <li>
        <RouterLink to="/postDetail/id3">Post 3</RouterLink>
      </li>
    </ul>

    <textarea v-autofocus />
  </div>
</template>

<script setup>
/*
  imports
*/

  import { vAutofocus } from '@/directives/vAutofocus'

</script>

<style scoped>
ul {
  margin-bottom: 30px;
}
</style>
```

`PostDetailsView` mostra i dettagli di ogni post. In questo componente sono presenti anche alcune azioni generiche di `vue-router` come:

- `useRoute`: Accede alla route corrente e consente ad esempio di prelevare i `params`
- `useRouter`: Accede al router e consente ad esempio di cambiare rotta

```html
<!--views/PostDetailView.vue-->
<template>
  <div class="post-detail">
    <h1>This is a post page</h1>
    <p>Display the content of post with ID of {{ $route.params.id }} here!</p>
    <div>
      <button @click="showPostId">Show Post ID</button>
    </div>
    <div>
      <button @click="goHomeIn3Seconds">Go Home in 3 seconds</button>
    </div>
    <div>
      <button @click="goToFirstPost">Go to first post</button>
    </div>
    <p><RouterLink to="/posts">&lt; Back</RouterLink></p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showPostId = () => {
  alert(`The ID of this post is: ${ route.params.id }`)
}

const goHomeIn3Seconds = () => {
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 3000)
}

const goToFirstPost = () => {
  router.push({
    name: 'postDetail',
    params: {
      id: 'id1'
    }
  })
}
</script>
```

# 07 Lists, Teleport Template-refs, next-tick

In questo esempio vedrai come renderizzare liste di elementi, utilizzando la direttiva `v-for`

## v-for

```html
<!--PostsView.vue-->
<template>
  <div class="posts">
    <h1>Posts</h1>

    <ul>
      <li
        v-for="post in posts"
        :key="post.id"
      >
        <RouterLink :to="`/postDetail/${ post.id }`">{{ post.title }}</RouterLink>
      </li>
    </ul>

    <textarea v-autofocus />
  </div>
</template>

<script setup>
/*
  imports
*/

  import { ref } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'

/*
  posts
*/

  const posts = ref([
    {
      id: 'id1',
      title: 'Post 1'
    },
    {
      id: 'id2',
      title: 'Post 2'
    },
    {
      id: 'id3',
      title: 'Post 3'
    }
  ])

</script>

<style scoped>
ul {
  margin-bottom: 30px;
}
</style>
```

## Template ref e next-tick

Nel prossimo esempio vedrai come accedere ad un elemento usando `ref(null)`. Vedi [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)

Vedrai inoltre l'utilizzo di `nextTick()` come Promise. Vedi [nextTick](https://vuejs.org/api/general.html#nexttick)


```html
<template>
  <div class="home">
    
    <h2 ref="appTitleRef">{{ appTitle }}</h2>

    <h3>{{ counterData.title }}:</h3>

    <div>
      <button @click="decreaseCounter(2)" class="btn">--</button>
      <button @click="decreaseCounter(1)" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter(1, $event)" class="btn">+</button>
      <button @click="increaseCounter(2)" class="btn">++</button>
    </div>

    <p>This counter is {{ oddOrEven }}</p>

    <div class="edit">
      <h4>Edit counter title:</h4>
      <input v-model="counterData.title" type="text" v-autofocus>
    </div>

  </div>
</template>

<script setup>
/*
  imports
*/

  import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
  import { vAutofocus } from '@/directives/vAutofocus'

/*
  app title
*/

  const appTitle = 'My Ok Counter App'

  const appTitleRef = ref(null)

  onMounted(() => {
    console.log(`The app title is ${ appTitleRef.value.offsetWidth } px wide!`)
  })

/*
  counter
*/

  const counterData = reactive({
    count: 0,
    title: 'My Counter'
  })

  watch(() => counterData.count, (newCount) => {
    if (newCount === 20) {
      alert('Way to go! You made it to 20!!')
    }
  })

  const oddOrEven = computed(() => {
    if (counterData.count % 2 === 0) return 'even'
    return 'odd'
  })

  const increaseCounter = async (amount, e) => {
    counterData.count += amount
    await nextTick()
    console.log('do something when counter has updated in the dom')
  }

  const decreaseCounter = amount => {
    counterData.count -= amount
  }

  onMounted(() => {
    console.log('Do stuff related to Counter')
  })

</script>


<style>
.home {
  text-align: center;
  padding: 20px;
}
.btn, .counter {
  font-size: 40px;
  margin: 10px;
}
.edit {
  margin-top: 60px;
}
</style>
```


## Teleport

In questo esempio vedrai `teleport` un sistema di trasferimento di un elemento da una posizione specifica del DOM ad un'altra.
Caso di applicazione: modale.

Vedi [Teleport](https://vuejs.org/guide/built-ins/teleport.html)

```html


<template>
  <div class="modals">
    <h1>Modals</h1>
    <button @click="showModal = true">Show modal</button>
    <teleport to=".modals-container">
      <div
        v-if="showModal"
        class="modal"
      >
        <h1>This is a modal</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsa laboriosam vero natus ut rerum quaerat, saepe praesentium tempore et hic velit odio nemo minus labore quam ullam quod architecto?</p>
        <button @click="showModal = false">Hide modal</button>
      </div>
    </teleport>
  </div>
</template>

<script setup>
/*imports*/

import { ref } from 'vue'

/*modals*/

const showModal = ref(false)

</script>

<style>
.modal {
  background: beige;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
```
# 07 Child components, Props, Emit, v-mdoel, Provide, Inject


## Provide and Inject

Un modo semplice per passare delle prop dal componente padre al componente n-figlio è quello di usare `provide`, `inject`.
Con `provide` il componente padre rende disponibile a tutti i figli le props, con `inject` è possibile usarle dai figli.

Vedi [Provide/Inject](https://vuejs.org/guide/components/provide-inject.html).

### Componente padre
```html
<template>
  <div class="user-data">
    {{ userData.name }} @{{ userData.username }}
  </div>

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/modals">Modals</RouterLink>
    <RouterLink to="/posts">Posts</RouterLink>
  </nav>

  <RouterView />
</template>
```

### Componente figlio

```html
<template>
  <teleport to=".modals-container">
    <div
      v-if="modelValue"
      class="modal"
    >
      <h1>{{ title }}</h1>
      <slot />
      <button @click="$emit('update:modelValue', false)">Hide modal</button>
      <div>
        Username is: {{ userData.username }}
      </div>
    </div>
  </teleport>
</template>

<script setup>
/*imports*/

import { inject } from 'vue'

/*props*/

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'No title specified'
  }
})

/*emits*/

const emit = defineEmits(['update:modelValue'])

/*user data*/

const userData = inject('userData')

</script>

<style>
.modal {
  background: beige;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
```

## defineProps and defineEmits

Le props da padre a figlio vengono passate come attributi. Il figlio deve registrare le props attracverso `defineProps`.
Allo stesso modo è possibile trasmettere eventi custom dal componente figlio al componente padre usando `defineEmit`.

Vedi [Props](https://vuejs.org/guide/components/props.html), [defineProps() & defineEmits()](https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)

### Componente padre

```html
<template>
  <div class="modals">
    <h1>Modals</h1>
    <div>
      <label>
        Show dark modals?
        <input
          v-model="showDarkModals"
          type="checkbox"
        />
      </label>
    </div>
    <button @click="showModal = true">Show modal</button>
    <component
      v-model="showModal"
      :is="showDarkModals ? ModalDark : Modal"
      title="My modal title (via prop)"
    >
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsa laboriosam vero natus ut rerum quaerat, saepe praesentium tempore et hic velit odio nemo minus labore quam ullam quod architecto?</p>
    </component>
  </div>
</template>

<script setup>
/*
  imports
*/

  import { ref } from 'vue'
  import Modal from '@/components/Modal.vue'
  import ModalDark from '@/components/ModalDark.vue'

/*
  modals
*/

  const showDarkModals = ref(false)
  const showModal = ref(false)

</script>
```

### Componente figlio

```html
<template>
  <teleport to=".modals-container">
    <div
      v-if="modelValue"
      class="modal"
    >
      <h1>{{ title }}</h1>
      <slot />
      <button @click="$emit('update:modelValue', false)">Hide modal</button>
      <div>
        Username is: {{ userData.username }}
      </div>
    </div>
  </teleport>
</template>

<script setup>
/*imports*/

import { inject } from 'vue'

/*props*/

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'No title specified'
  }
})

/*emits*/

const emit = defineEmits(['update:modelValue'])

/*user data*/

const userData = inject('userData')

</script>

<style>
.modal {
  background: beige;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
```

## Slot e  Component - compoenti dinamici

Puoi istanziare componenti dinamici utilizzando `component` e l'attributo `is`. Vedi [Built-in Special Elements](https://vuejs.org/api/built-in-special-elements.html#component)


# 09 Composables

Nel contesto delle applicazioni Vue, un **composables** è una funzione che sfrutta l'API di composizione Vue per incapsulare e riutilizzare la logica con stato.

Bedi [Composables](https://vuejs.org/guide/reusability/composables.html)

I componenti composables di solito si dichiarano all'interno della folder `use`

```sh
use/useCounter
```

In questo modo, questi componenti possono essere riutilizzati in tutta l'applicazione

```js
//use/useCounter.js
import { reactive, computed, watch, onMounted, nextTick } from 'vue'

export function useCounter() {

  const counterData = reactive({
    count: 0,
    title: 'My Counter'
  })  

  watch(() => counterData.count, (newCount) => {
    if (newCount === 20) {
      alert('Way to go! You made it to 20!!')
    }
  })

  const oddOrEven = computed(() => {
    if (counterData.count % 2 === 0) return 'even'
    return 'odd'
  })

  const increaseCounter = async (amount, e) => {
    counterData.count += amount
    await nextTick()
    console.log('do something when counter has updated in the dom')
  }

  const decreaseCounter = amount => {
    counterData.count -= amount
  }

  onMounted(() => {
    console.log('Do stuff related to Counter')
  })

  return {
    counterData,
    oddOrEven,
    increaseCounter,
    decreaseCounter
  }
}
```

Il componente vue diventa

```html
<template>
  <div class="home">
    
    <h2 ref="appTitleRef">{{ appTitle }}</h2>

    <h3>{{ counterData.title }}:</h3>

    <div>
      <button @click="decreaseCounter(2)" class="btn">--</button>
      <button @click="decreaseCounter(1)" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter(1, $event)" class="btn">+</button>
      <button @click="increaseCounter(2)" class="btn">++</button>
    </div>

    <p>This counter is {{ oddOrEven }}</p>

    <div class="edit">
      <h4>Edit counter title:</h4>
      <input v-model="counterData.title" type="text" v-autofocus>
    </div>

  </div>
</template>

<script setup>
/*imports*/

import { ref, onMounted } from 'vue'
import { useCounter } from '@/use/useCounter'
import { vAutofocus } from '@/directives/vAutofocus'

/*app title*/

const appTitle = 'My Ok Counter App'

const appTitleRef = ref(null)

onMounted(() => {
  console.log(`The app title is ${ appTitleRef.value.offsetWidth } px wide!`)
})

/*counter*/

const { counterData, oddOrEven, increaseCounter, decreaseCounter } = useCounter()
</script>
```

## VueUse

VueUse è una raccolta di funzioni di utility basate sulle API di composizione.

Vedi [VueUse](https://vueuse.org/guide/)


# 10 Pinia 

Pinia è una libreria di store per Vue, ti consente di condividere uno stato tra componenti / pagine.

Vedi [Pinia](https://pinia.vuejs.org/introduction.html)


## Definizione dello store

```js
//stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
    title: 'My Counter Title'
  }),
  actions: {
    increaseCounter(amount) {
      this.count += amount
    },
    decreaseCounter(amount) {
      this.count -= amount
    }
  },
  getters: {
    oddOrEven: (state) => {
      if (state.count % 2 === 0) return 'even'
      return 'odd'
    }
  }
})
```

## Utilizzo dello store attraverso i compoenti

```html
<template>
  <div class="home">
    
    <h2 ref="appTitleRef">{{ appTitle }}</h2>

    <h3>{{ counter.title }}:</h3>

    <div>
      <button @click="counter.decreaseCounter(2)" class="btn">--</button>
      <button @click="counter.decreaseCounter(1)" class="btn">-</button>
      <span class="counter">{{ counter.count }}</span>
      <button @click="counter.increaseCounter(1)" class="btn">+</button>
      <button @click="counter.increaseCounter(2)" class="btn">++</button>
    </div>

    <p>This counter is {{ counter.oddOrEven }}</p>

    <div class="edit">
      <h4>Edit counter title:</h4>
      <input
        v-model="counter.title"
        v-autofocus
        type="text"
      >
    </div>

  </div>
</template>

<script setup>
/*imports*/

import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { vAutofocus } from '@/directives/vAutofocus'

/*app title*/

const appTitle = 'My Ok Counter App'

const appTitleRef = ref(null)

onMounted(() => {
  console.log(`The app title is ${ appTitleRef.value.offsetWidth } px wide!`)
})

/*counter*/

const counter = useCounterStore()
</script>

```



