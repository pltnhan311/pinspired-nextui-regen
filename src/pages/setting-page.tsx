import { Tabs, Tab, Card, CardBody, Avatar, Badge, Input, Radio, RadioGroup } from '@nextui-org/react';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { useUserInfo } from '~/hooks/customHooks/useUserInfo';

const SettingPage = () => {
  const userData = useUserInfo();
  const gender = userData?.Gender;

  const [checked, setChecked] = useState('Profile');
  const [selected, setSelected] = useState(gender);

  return (
    <div className='flex flex-col items-center h-screen justify-start p-4'>
      <div className='w-full max-w-2xl flex-1 p-4'>
        <div className='flex items-center gap-x-3'>
          <h1 className='text-3xl font-bold leading-9 text-default-foreground'>Settings</h1>
        </div>
        <h2 className='mt-2 text-small text-default-500'>Customize settings, email preferences, and web appearance.</h2>
        <Tabs
          fullWidth
          className='w-full mt-6'
          aria-label='Options'
          selectedKey={checked}
          onSelectionChange={(key) => setChecked(String(key))}
        >
          <Tab key='Profile' title='Profile' className='w-full p-0'>
            <div className='p-2 space-y-4 pt-4'>
              <div>
                <p className='text-ft text-default-700'>Profile</p>
                <p className='mt-1 text-sm font-normal text-default-400'>
                  This displays your public profile on the site.
                </p>
              </div>
              <Card className='mt-2 mb-4'>
                <CardBody className='flex flex-row items-center gap-4'>
                  <Badge
                    isOneChar
                    content={<Pen size={10} />}
                    color='default'
                    placement='bottom-right'
                    className='bottom-[10%] right-[10%] '
                  >
                    <Avatar className='h-16 w-16' radius='full' src='https://i.pravatar.cc/150?u=a04258a2462d826712d' />
                  </Badge>

                  <div>
                    <p className='text-sm font-medium text-default-600'>{userData?.FullName}</p>
                    <p className='text-xs text-default-400'>Customer Support</p>
                    <p className='mt-1 text-xs text-default-400'>{userData?.Email}</p>
                  </div>
                </CardBody>
              </Card>
              <div>
                <p className='text-ft text-default-700 mb-2'>Fullname</p>
                <Input value={userData?.FullName} />
              </div>
              <div>
                <p className='text-ft text-default-700 mb-2'>Username</p>
                <Input value={userData?.UserName} />
              </div>
              <div>
                <p className='text-ft text-default-700 mb-2'>Email</p>
                <Input value={userData?.Email} />
              </div>
              <div>
                <p className='text-ft text-default-700 mb-2'>Gender</p>
                <div className='flex flex-col gap-3'>
                  <RadioGroup size='sm' value={selected || gender} orientation='horizontal' onValueChange={setSelected}>
                    <Radio className='mr-2' value='Nam'>
                      Male
                    </Radio>
                    <Radio value='Nữ'>Female</Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </Tab>
          <Tab key='Appearance' title='Appearance' className='w-full p-0'>
            <div className='p-2 space-y-4 pt-4'>
              <div>
                <p className='text-ft text-default-700'>Theme</p>
                <p className='mt-1 text-sm font-normal text-default-400'>Change the appearance of the web.</p>
              </div>
            </div>
          </Tab>
          <Tab key='Account' title='Account'></Tab>
          <Tab key='Feed' title='Feed'></Tab>
          <Tab key='Billing' title='Billing'></Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingPage;
