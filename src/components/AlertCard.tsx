import cn from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';
import { VscClose } from 'react-icons/vsc';
import { Alert, useAlertStore } from '../stores';

interface Props {
  alert: Alert;
  icon: IconType;
  bgColor: string;
}

export const AlertCard = ({ icon: Icon, alert, bgColor }: Props) => {
  const { removeAlert } = useAlertStore();

  return (
    <div
      key={alert.id}
      className={cn(
        bgColor,
        'text-gray-600 bg-opacity-90 transition-opacity hover:bg-opacity-100 flex items-center sm:rounded-r-sm sm:pl-5',
      )}
    >
      <div className="m-3 sm:m-5">
        <Icon
          className="text-xl fill-current sm:text-2xl"
          title={`${alert.type} icon`}
        />
      </div>
      <p className="flex-1 py-5 overflow-hidden overflow-ellipsis">
        {alert.message}
      </p>
      <button
        onClick={() => removeAlert(alert.id)}
        className="self-start p-3 focus-ring"
      >
        <VscClose size={20} />
      </button>
    </div>
  );
};
