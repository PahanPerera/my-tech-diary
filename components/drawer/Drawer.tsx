import styles from "./Drawer.module.css";

export function Drawer({ children }: any) {
  return <main className={styles.drawerMain}>{children}</main>;
}
