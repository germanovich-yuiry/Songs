import { useForm, FormProvider } from 'react-hook-form';
import avatar from '../../assets/images/avatar-default.png';
import { AppLink, EmailInput, TextInput } from '../../shared';
import styles from './ProfilePageLayout.module.scss';
import Button from '../../shared/ui/Button/Button';
import { useTheme, Theme } from '../../app/providers/ThemeProvide';
import Avatar from '../../shared/Avatar/Avatar';
import { inputsInfo } from './info';
import { useGetUserProfileQuery } from '../../services/user/userProfile.api';
import { getPreviousRoute } from '../../utils/utils';
import { useState, useEffect } from 'react';

const ProfilePageLayout = () => {
  const { data, isSuccess } = useGetUserProfileQuery('');
  const [isValid, setIsValid] = useState(false);

  if (isSuccess) {
    for (const input of inputsInfo) {
      switch (input.id) {
        case 1:
          input.placeholder = data['lastName'];
          break;
        case 2:
          input.placeholder = data['firstName'];
          break;
        case 3:
          input.placeholder = data['firstName'];
          break;
        case 4:
          input.placeholder = data['birthDate'];
          break;
      }
    }
  }

  const methods = useForm();
  const { theme } = useTheme();
  const styleButton = {
    width: `318px`,
    backgroundColor: '#1676f3',
    color: '#FFFFFF',
    padding: '20px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    alignSelf: 'center',
  };
  const themeButton =
    theme === Theme.DARK
      ? {
          color: '#090909',
          backgroundColor: '#e9890c',
        }
      : undefined;
  const text = 'Save';

  useEffect(() => {
    const img = new Image();
    img.src = data?.['avatarUrl'] as string;
    img.onload = () => {
      setIsValid(true);
    };
    return () => {
      img.onload = null;
    };
  }, [data]);

  const currentUrl = window.location.href;
  const routeToUserPage = getPreviousRoute(currentUrl);
  return (
    <div className={styles['container-margin']}>
      <div className={styles['container-centred']}>
        <div className={styles.heading}>
          <AppLink
            to={routeToUserPage}
            children={'Back'}
            className={`${styles.button} ${styles.exit}`}
            role={''}
          />
          <Avatar
            avatar={isSuccess && isValid ? data['avatarUrl'] : avatar}
            classNameContainer={styles['add-button']}
            classNameImage={styles.avatar}
          />
          <AppLink
            to={''}
            children={'Change Password'}
            className={styles.button}
            role={''}
          />
        </div>
        <FormProvider {...methods}>
          <form className={styles['form-container']} data-testid={'form'}>
            {inputsInfo.map((input) => {
              if (input.name === 'E-mail') {
                return (
                  <EmailInput
                    key={input.id}
                    name={input.name}
                    label={input.name}
                    placeholder={input.placeholder}
                  />
                );
              }
              return (
                <TextInput
                  key={input.id}
                  name={input.name}
                  label={input.name}
                  placeholder={input.placeholder}
                />
              );
            })}
          </form>
        </FormProvider>
        <Button styleBtn={styleButton} text={text} theme={themeButton} />
      </div>
    </div>
  );
};

export default ProfilePageLayout;
