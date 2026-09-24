export default function OptionGroup({ title, options, selected, onSelect }) {
  return <div className="option-group"><h3>{title}</h3><div>{options.map((option) => <button key={option} className={selected === option ? 'option selected' : 'option'} onClick={() => onSelect(option)}>{option}</button>)}</div></div>
}
