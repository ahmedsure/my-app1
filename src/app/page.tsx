import styles from './page.module.css'
import AppComponent from './components/app'

export default function Home() {
  return (
    <main className={styles.main}>
      <AppComponent />
    </main>
  )
}
