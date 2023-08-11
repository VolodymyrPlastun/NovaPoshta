import axios from 'axios';

const getPackageStatus = async waybillNumber => {
  const apiKey = '4fc399b748c58f437a03a18b879adab1';
  const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';

  try {
    const response = await axios.post(apiUrl, {
      apiKey: apiKey,
      modelName: 'TrackingDocument',
      calledMethod: 'getStatusDocuments',
      methodProperties: {
        Documents: [
          {
            DocumentNumber: waybillNumber,
            Phone: '',
          },
        ],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Помилка при запиті:', error);
    return null;
  }
};

export default getPackageStatus;
