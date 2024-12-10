/* eslint-disable tailwindcss/no-custom-classname */
import { ReactNode, useCallback } from 'react'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { cn } from '../utils/cn'
import React from 'react'
import {
	DndContext,
	useSensors,
	useSensor,
	MouseSensor,
	DragEndEvent
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'

const generateRandomInteger = (): number =>
	Math.floor(Math.random() * 1329012483472984) // Math.random() generates a random number between 0 (inclusive) and 1 (exclusive), so multiplying by 10001 gives a range from 0 to 10000.9999. Math.floor() rounds down to the nearest integer.

const getNewTodo = (): Todo => ({
	label: '',
	autoFocus: true,
	checked: false,
	id: `${generateRandomInteger()}`,
	selected: false
})

type Todo = {
	label: string
	checked: boolean
	id: string
	selected?: boolean
	autoFocus?: boolean
}
interface OwnProps {
	children?: ReactNode
	title: string
	emoji: string
	description: string
	selected?: boolean
	todos?: Todo[]
	autoFocus?: boolean
}

export const ListCard = ({
	selected,
	title,
	emoji,
	description,
	todos = []
}: OwnProps) => {
	const [innerTodos, setInnerTodos] = React.useState<Todo[]>(todos)
	const onAddTodo = React.useCallback(() => {
		setInnerTodos((old) => [...old, getNewTodo()])
	}, [])
	const onToggleCheckbox = React.useCallback((event: any) => {
		setInnerTodos((old) => {
			const i = old.findIndex((el: Todo) => el.id === event.id)
			old[i].checked = !old[i].checked
			return [...old]
		})
	}, [])

	const onDeleteCheckbox = React.useCallback((event: any) => {
		setInnerTodos((old) => old.filter((el: Todo) => el.id !== event.id))
	}, [])

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				delay: 200,
				tolerance: 0
			}
		})
	)

	const handleDragEnd = useCallback((event: DragEndEvent) => {
		setInnerTodos((old) => {
			if (event.over?.id) {
				const oldIdx = old.findIndex(
					(el) => el.id === event.active.id.toString()
				)
				const newIdx = old.findIndex(
					(el) => el.id === event.over!.id.toString()
				)
				return arrayMove(old, oldIdx, newIdx)
			}
			return old
		})
	}, [])

	return (
		<div
			className={cn(
				'flex h-auto w-[330px] flex-col  overflow-hidden rounded-xl border border-slate-200 py-2 pb-4',
				{ 'border-accent': selected }
			)}
		>
			<div
				className="flex w-full items-center gap-x-1 px-4 pr-2"
				title={description}
			>
				<div className="flex w-full gap-2">
					<span className=" text-xl font-bold"> {emoji}</span>
					<span className="text-xl font-bold"> {title}</span>
				</div>
				<Button variant="ghost" size="icon">
					<span
						onClick={onAddTodo}
						className="material-icons w-4 !text-base"
					>
						add
					</span>
				</Button>
				<Button variant="ghost" size="icon">
					<span className="material-icons w-4 !text-base">
						more_vertical
					</span>
				</Button>
			</div>
			<hr className="mx-[-16px] my-2" />
			<div className="flex flex-col">
				<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
					<SortableContext
						strategy={verticalListSortingStrategy}
						items={innerTodos}
					>
						{innerTodos.map(
							({ checked, id, label, selected, autoFocus }) => (
								<Checkbox
									onCheckedChange={onToggleCheckbox}
									onDelete={onDeleteCheckbox}
									selected={selected}
									key={id}
									checked={checked}
									id={id}
									label={label}
									autoFocus={autoFocus}
								/>
							)
						)}
					</SortableContext>
				</DndContext>
			</div>
		</div>
	)
}
