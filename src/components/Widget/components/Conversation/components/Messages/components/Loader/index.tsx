import cn from 'classnames';

import './styles.scss';

type Props = {
	typing: boolean;
	compact?: boolean;
};

function Loader({ typing, compact = false }: Props) {
	return (
		<div className={cn('loader', { active: typing })}>
			<div className={cn('loader-container', { compact: compact })}>
				<span className='loader-dots'></span>
				<span className='loader-dots'></span>
				<span className='loader-dots'></span>
			</div>
		</div>
	);
}

export default Loader;
