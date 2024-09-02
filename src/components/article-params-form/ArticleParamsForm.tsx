import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Text } from '../text/Text';
import { Select } from '../select/Select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type TArticleParamsFormProps = {
	formState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ formState }: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedArticleState, setSelectedArticleState] =
		useState(defaultArticleState);

	const rootRef = useRef(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		formState(selectedArticleState);
		setIsOpen(false);
	};

	const handleFormReset = () => {
		formState(defaultArticleState);
		setSelectedArticleState(defaultArticleState);
		setIsOpen(false);
	};

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectedArticleState({ ...selectedArticleState, [key]: value });
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={setIsOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={selectedArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => {
							handleChange('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						name='размер шрифта'
						title='размер шрифта'
						selected={selectedArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => {
							handleChange('fontSizeOption', option);
						}}
					/>
					<Select
						title='цвет шрифта'
						selected={selectedArticleState.fontColor}
						options={fontColors}
						onChange={(option) => {
							handleChange('fontColor', option);
						}}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={selectedArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => {
							handleChange('backgroundColor', option);
						}}
					/>
					<Select
						title='ширина контента'
						selected={selectedArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => {
							handleChange('contentWidth', option);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
