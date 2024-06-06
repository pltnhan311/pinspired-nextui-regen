import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <Input
      classNames={{
        base: 'max-w-full h-10 flex shrink-1',
        mainWrapper: 'h-full',
        input: 'text-small',
        inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-full'
      }}
      placeholder='Type to search...'
      size='md'
      startContent={<Search size={18} />}
      type='search'
    />
  );
};

export default SearchInput;
