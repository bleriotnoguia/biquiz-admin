'use server'

import { revalidateTag as revalidate, revalidatePath } from 'next/cache'

export async function revalidateTag(name) {
  revalidate(name)
}

export async function revalidateThePath(path) {
  revalidatePath(path)
}
