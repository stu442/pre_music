'use client'

import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"

const formSchema = z.object({
    search: z.string()
    .min(1, { message: '검색어는 1글자 이상이어야 합니다.' })
    .max(50, { message: '검색어는 50글자를 넘길 수 없습니다.' }),
})

export default function HeaderForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          search: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        router.push(`/search/?keyword=${values.search}`, {scroll: false})
        form.reset()
      }

    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='검색어를 입력해주세요.' autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
    )
}