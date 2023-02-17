import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { GlobalState } from 'src/store/types';
import './style.scss';

type Props = {
	onQuickListSubmitButtonClicked: (e: any, value: any) => any;
};

function QuickList({ onQuickListSubmitButtonClicked }: Props) {
	const onSubmitButtonClicked = (event, value) => {
		onQuickListSubmitButtonClicked(event, value);
		console.log(listConfig.type, 'asd');
		setValue([]);
	};

	const [value, setValue] = useState<Array<string>>([]);

	const setList = (x) => {
		if (listConfig.type == 'single') {
			setValue([x]);
		} else {
			let array = value;
			let bool = false;
			let index = 0;
			array.forEach((element) => {
				if (x == element) {
					bool = true;
					index = array.indexOf(element);
				}
			});
			if (bool) {
				array.splice(index, 1);
				setValue(array);
			} else {
				setValue([...value, x]);
			}
		}
	};

	//make one call to global state like in messages

	// const list = useSelector((state: GlobalState) => state.quickList.quickList);
	// const listConfig = useSelector(
	// 	(state: GlobalState) => state.quickList.quickListConfig
	// );
	const { list , listConfig } = useSelector((state: GlobalState) => ({
		list: state.quickList.quickList,
		listConfig: state.quickList.quickListConfig,
	}));

	if (!list.length) return null;

	// const constGetClassName = (x) => {
	// 	let array = value;
	// 	let bool = false;
	// 	let index = 0;
	// 	array.forEach((element) => {
	// 		if (x == element) {
	// 			bool = true;
	// 			index = array.indexOf(element);
	// 		}
	// 	});
	// 	if (bool) {
	// 		return 'quick-list-button-menu-active';
	// 	} else {
	// 		return 'quick-list-button';
	// 	}
	// };

	const onChangeHandler = (event,item)=>{
		setList(item.value)
		event.stopPropagation();
	}

	return (
		<div className="quick-list-container">
			<ul className="quick-list">

				
				{list.map((item, index) => (
					<li className={'quick-list-list'} key={`${item.label}-${index}`}>

						{listConfig.type=="single"&&
						<div className='list-item'> 
						<input
							className='checkbox'
							type="radio"
							name="site_name"
							value={item.label}
							onChange={(event)=>onChangeHandler(event,item)}
						/>{item.label}
						</div>}
						{!(listConfig.type=="single")&&
						<div className='list-item'> 
						<input
							className='checkbox'
							type="checkbox"
							name="site_name"
							value={item.label}
							onChange={(event)=>onChangeHandler(event,item)}
						/>{item.label}
						</div>}
					</li>
				))}

						<li className="quick-list-submit-button">
							<button
							disabled={value.length<1}
								className="submit-button"
								onClick={(event) => onSubmitButtonClicked(event, value)}
							>
								submit
							</button>
						</li>
			</ul>
		</div>
	);
}

export default QuickList;
