package com.grupo04.culturarte.services.implementations;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo04.culturarte.models.dtos.AddSponsorshipDTO;
import com.grupo04.culturarte.models.entities.Sponsorship;
import com.grupo04.culturarte.repositories.SponsorshipRepository;
import com.grupo04.culturarte.services.SponsorshipService;

import jakarta.transaction.Transactional;

@Service
public class SponsorshipServiceImp implements SponsorshipService {

	@Autowired
	SponsorshipRepository sponsorshipRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(AddSponsorshipDTO info) throws Exception {
		Sponsorship sponsor = new Sponsorship(info.getNameSponsorship(), info.getLogo());

		sponsorshipRepository.save(sponsor);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void update(AddSponsorshipDTO info, UUID sponsorId) throws Exception {
		Sponsorship sponsor = findById(sponsorId);

		if (sponsor == null)
			throw new Exception("Sponsorship not found");

		sponsor.setNameSponsorship(info.getNameSponsorship());
		sponsor.setLogo(info.getLogo());

		sponsorshipRepository.save(sponsor);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void delete(UUID sponsorshipId) throws Exception {
		sponsorshipRepository.deleteById(sponsorshipId);
	}

	@Override
	public List<Sponsorship> findAll() {
		return sponsorshipRepository.findAll();
	}

	@Override
	public Sponsorship findById(UUID sponsorId) {
		List<Sponsorship> sponsor = sponsorshipRepository.findAll().stream()
				.filter(s -> s.getSponsorshipId().equals(sponsorId)).collect(Collectors.toList());

		if (sponsor.isEmpty()) {
			return null;
		}

		Sponsorship sponsorFind = sponsor.get(0);

		return sponsorFind;
	}

}
